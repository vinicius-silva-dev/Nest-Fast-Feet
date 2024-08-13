/* eslint-disable prettier/prettier */
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMappers {
  static toDomain(raw: PrismaUser) {
    return User.create({
      name: raw.name,
      cpf: raw.cpf,
      password: raw.password,
      role: raw.role,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

}
