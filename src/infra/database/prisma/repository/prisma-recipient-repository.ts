/* eslint-disable prettier/prettier */
import { RecipientRepository } from 'src/domain/fast-feet/application/repository/recipient-repository'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { PrismaService } from '../prisma.service'
import { PrismaRecipientMappers } from '../mappers/prisma-recipient-mappers'


export class PrismaRecipientRepository implements RecipientRepository {
  constructor(
    private prisma: PrismaService
  ) {

  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: {
        id
      }
    })

    if (!recipient) {
      return null
    }

    return PrismaRecipientMappers.toDomain(recipient)
  }


  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMappers.toPrisma(recipient)
    await this.prisma.recipient.create({
      data
    })
  }

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMappers.toPrisma(recipient)
    await this.prisma.recipient.update({
      where: {
        id: data.id
      },
      data
    })
  }


  async delete(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMappers.toPrisma(recipient)
    await this.prisma.recipient.delete({
      where: {
        id: data.id
      }
    })
  }

}
