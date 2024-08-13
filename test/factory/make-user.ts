/* eslint-disable prettier/prettier */
import { User, UserProps } from 'src/domain/fast-feet/enteprise/entities/user'
import {faker} from '@faker-js/faker'
import {Injectable } from '@nestjs/common'
import { PrismaUserMappers } from 'src/infra/database/prisma/mappers/prisma-user-mappers'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    name: faker.person.fullName(),
    cpf: faker.string.uuid(),
    password: faker.internet.password(),
    role: faker.person.jobTitle(),
    createdAt: new Date(),
    ...override
  })

  return user
}

@Injectable()
export class UserFactory {
  constructor(
    private prisma: PrismaService
  ) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMappers.toPrisma(user)
    })

    return user
  }
}
