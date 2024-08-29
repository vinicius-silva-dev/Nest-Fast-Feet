/* eslint-disable prettier/prettier */
import { AttachmentRepository } from 'src/domain/fast-feet/application/repository/attachment-repository'
import { Attachments } from 'src/domain/fast-feet/enteprise/entities/attachment'
import { PrismaService } from '../prisma.service'
import { PrismaAttachementMapper } from '../mappers/prisma-attachment-mappers'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}
  async create(attachment: Attachments): Promise<void> {
    const data = PrismaAttachementMapper.toPrisma(attachment)
    await this.prisma.attachment.create({
      data
    })
  }

  async findById(id: string): Promise<Attachments | null> {
    const result = await this.prisma.attachment.findFirst({
      where: {
        packageId: id
      }
    })
  
    if (!result) {
      return null
    }

    return PrismaAttachementMapper.toDomain(result)
  }
}
