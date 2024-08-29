/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { Attachments } from '../../enteprise/entities/attachment'
import { AttachmentRepository } from '../repository/attachment-repository'
import { Uploader } from '../storage/uploader'

interface UploadeFileUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
  userId: string
  recipientId: string,
  packageId: string
}

type UploaderFileResponse = {
  attachment: Attachments
}

@Injectable()
export class UploadFileUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader
  ) {}

  async execute({
    fileName,
    fileType,
    body,
    userId,
    recipientId,
    packageId
  }: UploadeFileUseCaseRequest): Promise<UploaderFileResponse> {

    const {url} = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachments.create({
      title: fileName,
      url,
      userId,
      recipientId,
      packageId
    })

    await this.attachmentRepository.create(attachment)

    return {
      attachment
    }
  }
}
