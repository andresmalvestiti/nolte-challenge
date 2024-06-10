import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';


const schema = z.object({
  score: z.number(),
  feedback: z.string()
});

const model = openai('gpt-3.5-turbo');
const instructions = 'You are a smart assistant for a fitness coach. Assess workout plans from files and provide meaningful feedback. Score them from 1 to 100. Plan: ';

export const getWorkoutPlanFeedback = async (plan: string) => {
  const { object } = await generateObject({
    model,
    schema,
    prompt: instructions + plan,
  });
  return object;
};
