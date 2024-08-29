/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { GetAttachmentByUserUseCase } from 'src/domain/fast-feet/application/use-case/get-attachment-by-id';

@Controller('/attachment/:id')
export class GetAttachmentByUser {
  constructor(private getPackagByUser: GetAttachmentByUserUseCase) {}

  @Get()
  async getAttachment(@Param('id') attachmentId: string) {
    const result = await this.getPackagByUser.execute({id: attachmentId})

    if (!result) {
      throw new Error('Attachment not found!')
    }

    return result.attachment
  }
}
