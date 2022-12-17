import { S3Storage } from './storage/s3Storage';
import { Storage } from './storage/storage';

export function createStorage(): Storage {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    throw new Error('S3_BUCKET is not defined');
  }

  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  if (!secretAccessKey) {
    throw new Error('S3_SECRET_ACCESS_KEY is not defined');
  }

  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  if (!accessKeyId) {
    throw new Error('S3_ACCESS_KEY_ID is not defined');
  }

  return new S3Storage(secretAccessKey, accessKeyId, bucket);
}
