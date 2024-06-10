import { NextRequest, NextResponse } from 'next/server'
import query from '@/lib/db';
import { uploadToS3 } from '@/lib/aws';
import { getWorkoutPlanFeedback } from '@/lib/openai';
import { addWorkout, getAllWorkouts } from '@/querys/querys';

export async function GET(req: NextRequest) {
  try {
    const result = await query(getAllWorkouts, []);
    return NextResponse.json({
      workouts: result.rows
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json({
      message: 'Internal Server Error'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const file = formData.get('file') as File;

    if (!file || ! title) {
      return NextResponse.json({
        message: 'No file uploaded or title provided'
      }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const storagePromise = uploadToS3(Buffer.from(buffer), `${Date.now()}_${file.name}`);

    const fileContent = buffer.toString();
    const predictionPromise = getWorkoutPlanFeedback(fileContent);

    const [storageData, predictionData] = await Promise.all([storagePromise, predictionPromise]);

    const { Bucket, Key } = storageData;
    const { feedback, score } = predictionData;
    const s3Url = `${Bucket}/${Key}`;

    const result = await query(addWorkout, [title, s3Url, feedback, score]);
    return NextResponse.json({ workout: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error while processing the file:', error);
    return NextResponse.json({
      message: 'Error while processing the file'
    }, { status: 500 });
  }
}