/* eslint-disable prettier/prettier */
import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileUseCase } from 'src/domain/fast-feet/application/use-case/upload-file';

@Controller('/attachment/:userId/:recipientId/:packageId')
export class UploadFileController {
  constructor(
    private uploaderFile: UploadFileUseCase
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('userId') userId: string,
    @Param('recipientId') recipientId: string,
    @Param('packageId') packageId: string
  ) {
    console.log(file)
    try {
      const result = await this.uploaderFile.execute({
        fileName: file.originalname,
        fileType: file.mimetype,
        body: file.buffer,
        userId,
        recipientId,
        packageId
      })
      
      if (!result) {
        throw new Error('Cannot create attachment!')
      }
  
      return {
        attachment: result.attachment,
        attachmentId: result.attachment.id.toString()
      }
    } catch (error) {
      console.log(error)
    }
    
  }
}
