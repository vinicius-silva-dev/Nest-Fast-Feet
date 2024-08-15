/* eslint-disable prettier/prettier */
import { Recipient, RecipientProps } from 'src/domain/fast-feet/enteprise/entities/recipient'
import {faker} from '@faker-js/faker'
import {Injectable } from '@nestjs/common'
import { PrismaRecipientMappers } from 'src/infra/database/prisma/mappers/prisma-recipient-mappers'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeRecipient(override: Partial<RecipientProps> = {}) {
  const recipient = Recipient.create({
    name: faker.person.fullName(),
    rua: faker.lorem.slug(),
    numero: faker.number.int(),
    bairro: faker.lorem.slug(),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    packageId: [],
    createdAt: new Date(),
    ...override
  })

  return recipient
}

@Injectable()
export class RecipientFactory {
  constructor(
    private prisma: PrismaService
  ) {}

  async makePrismaRecipient(data: Partial<RecipientProps> = {}): Promise<Recipient> {
    const recipient = makeRecipient(data)

    await this.prisma.recipient.create({
      data: PrismaRecipientMappers.toPrisma(recipient)
    })

    return recipient
  }
}
