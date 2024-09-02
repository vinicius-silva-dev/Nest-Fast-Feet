/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetAttachmentByUserUseCase } from 'src/domain/fast-feet/application/use-case/get-attachment-by-id';
// import { JwtAuthGuard } from 'src/infra/auth/jwt-auth';
// import { RoleAdmin } from 'src/infra/middleware/role-admin'

@Controller('/attachment/:id')
export class GetAttachmentByUser {
  constructor(private getPackagByUser: GetAttachmentByUserUseCase) {}

  @Get()
  @UseGuards( AuthGuard('jwt'))
  // @UseInterceptors(RoleAdmin)
  async getAttachment(@Param('id') attachmentId: string) {
    const result = await this.getPackagByUser.execute({id: attachmentId})

    if (!result) {
      throw new Error('Attachment not found!')
    }

    return result.attachment
  }
}
