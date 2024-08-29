/* eslint-disable prettier/prettier */
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Attachments } from '../../../../domain/fast-feet/enteprise/entities/attachment'
import {Prisma, Attachment as PrismaAttachment} from '@prisma/client'

// Essa classe é responsável por converter a classe que vem do prisma  para uma classe igual da entidade de dominio.
export class PrismaAttachementMapper {
  static toDomain(raw: PrismaAttachment): Attachments {
    return Attachments.create({
      title: raw.title,
      url: raw.url,
      userId: raw.userId,
      recipientId: raw.recipientId,
      packageId: raw.packageId
    }, new UniqueEntityId(raw.id)) 
  }

  static toPrisma(attachement: Attachments): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachement.id.toString(),
      title: attachement.title,
      url: attachement.url,
      userId: attachement.userId,
      recipientId: attachement.recipientId,
      packageId: attachement.packageId
    }
  }

  
}
