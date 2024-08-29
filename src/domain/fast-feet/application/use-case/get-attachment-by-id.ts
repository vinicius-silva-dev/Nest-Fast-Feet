/* eslint-disable prettier/prettier */
import { Attachments } from 'src/domain/fast-feet/enteprise/entities/attachment'
import { AttachmentRepository } from '../../../fast-feet/application/repository/attachment-repository'
import { Injectable } from '@nestjs/common'

interface GetAttachmentByUserRequest {
  id: string
}

type GetAttachmentByUserResponse = {
  attachment: Attachments
}

@Injectable()
export class GetAttachmentByUserUseCase {
  constructor(private attachmentRepository: AttachmentRepository) {}
  async execute({
    id,
  }: GetAttachmentByUserRequest): Promise<GetAttachmentByUserResponse> {
    const attachment = await this.attachmentRepository.findById(id)

    if (!attachment) {
      throw new Error('Attachments not found')
    }

    return {
      attachment,
    }
  }
}
