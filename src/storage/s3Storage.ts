import { Storage } from './storage';
import { S3, config, Credentials } from 'aws-sdk';

export class S3Storage implements Storage {
  private readonly client: S3;
  private readonly bucket: string;

  constructor(secretAccessKey: string, accessKeyId: string, bucket: string) {
    config.credentials = new Credentials(accessKeyId, secretAccessKey);

    this.client = new S3({ endpoint: 's3.eu-central-1.amazonaws.com', region: 'eu-central-1' });
    this.bucket = bucket;
  }

  async getWithPath(path: string): Promise<Buffer> {
    const params = {
      Bucket: this.bucket,
      Key: path,
    };

    const data = await this.client.getObject(params).promise();
    return data.Body as Buffer;
  }

  async upload(path: string, content: Buffer): Promise<void> {
    const params = {
      Bucket: this.bucket,
      Key: path,
      Body: content,
    };

    await this.client.upload(params).promise();
  }

  async delete(path: string): Promise<void> {
    const params = {
      Bucket: this.bucket,
      Key: path,
    };

    await this.client.deleteObject(params).promise();
  }
}
