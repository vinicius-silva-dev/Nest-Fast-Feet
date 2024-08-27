/* eslint-disable prettier/prettier */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';
import { Uploader, UploadParams } from 'src/domain/fast-feet/application/storage/uploader';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(
    private envService: EnvService
  ) {
    // const accountId = envService.get('CLOUDFLARE_ACCOUNT_ID')
    this.client = new S3Client({
      endpoint: `https://3bcab79d365c99fc64fdc1b07e42a8cf.r2.cloudflarestorage.com/fast-feet`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_ACESS_KEY_SECRET')
      }
    })
  }

  async upload({
    fileName,
    fileType,
    body
  }: UploadParams): Promise<{ url: string; }> {
    const upload = randomUUID()
    const uniqueFileName = `${upload}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body
      })

    )

    return {
      url: uniqueFileName
    }
  }
}
