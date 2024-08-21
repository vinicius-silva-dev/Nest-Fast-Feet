/* eslint-disable prettier/prettier */
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export class PrismaUserMappers {
  static toDomain(raw: PrismaUser) {
    return User.create({
      name: raw.name,
      cpf: raw.cpf,
      password: raw.password,
      role: raw.role,
      packageId: [],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
      // package: user.packageId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

}
