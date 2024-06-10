let s3 = require('../lib/aws');

async function createBucket() {
  try {
    const bucketParams = { Bucket: 'workouts' };
    await s3.createBucket(bucketParams).promise();
    console.log('Bucket created successfully');
  } catch (error) {
    if (error.code === 'BucketAlreadyOwnedByYou' || error.code === 'BucketAlreadyExists') {
      console.log('Bucket already exists');
    } else {
      console.error('Error creating bucket:', error);
    }
  }
}

createBucket().catch(console.error);
