/* eslint-disable prettier/prettier */
import { randomUUID } from 'crypto';
import { Uploader, UploadParams } from 'src/domain/fast-feet/application/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

export class FakerUpload implements Uploader {
  public uploads: Upload[] = []

  async upload({fileName}: UploadParams): Promise<{ url: string; }> {
    const url = randomUUID()
    
    await this.uploads.push({
      fileName,
      url
    })

    return {url}
  }
}
