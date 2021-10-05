import AWS from 'aws-sdk';

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const DESTINATION = process.env.REACT_APP_AWS_S3_BUCKET_DESTINATION;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const MY_BUCKET = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export {
  S3_BUCKET,
  DESTINATION,
  MY_BUCKET
}
