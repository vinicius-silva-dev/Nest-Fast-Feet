/* eslint-disable prettier/prettier */
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Prisma, Package as PrismaPackage } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Status, StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
export class PrismaPackageMappers {
  static toDomain(raw: PrismaPackage) {

    return Package.create({
      name: raw.name,
      userId: raw.userId,
      recipientId: raw.recipientId,
      status: new StatusValueObject().toValue(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(_package: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: _package.id.toString(),
      name: _package.name,
      userId: _package.userId,
      recipientId: _package.recipientId,
      status: Status.aguardando,
      createdAt: _package.createdAt,
      updatedAt: _package.updatedAt
    }
  }

}
