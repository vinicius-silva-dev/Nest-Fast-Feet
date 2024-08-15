/* eslint-disable prettier/prettier */
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export class PrismaRecipientMappers {
  static toDomain(raw: PrismaRecipient) {
    const latitude = parseInt(raw.latitude.toString())
    const longitude = parseInt(raw.longitude.toString())
    return Recipient.create({
      name: raw.name,
      rua: raw.rua,
      numero: raw.numero,
      bairro: raw.bairro,
      cidade: raw.cidade,
      estado: raw.estado,
      latitude,
      longitude,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      packageId: []
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      rua: recipient.rua,
      numero: recipient.numero,
      bairro: recipient.bairro,
      cidade: recipient.cidade,
      estado: recipient.estado,
      latitude: recipient.latitude,
      longitude: recipient.longitude
    }
  }

}
