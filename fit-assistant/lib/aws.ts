import AWS, { S3 } from 'aws-sdk';

const s3 = new AWS.S3({
  endpoint: 'http://localstack:4566',
  s3ForcePathStyle: true,
  accessKeyId: 'test',
  secretAccessKey: 'test',
  region: 'us-east-1',
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;

export const uploadToS3 = (body: S3.Types.Body, key: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
  };

  return s3.upload(uploadParams).promise();
};

export default s3;