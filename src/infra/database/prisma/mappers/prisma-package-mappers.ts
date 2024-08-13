/* eslint-disable prettier/prettier */
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Prisma, Package as PrismaPackage } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
export class PrismaPackageMappers {
  static toDomain(raw: PrismaPackage) {

    return Package.create({
      name: raw.name,
      recipientId: raw.recipientId,
      status: new StatusValueObject(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      id: new UniqueEntityId()
    })
  }

  static toPrisma(_package: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: _package.id.toString(),
      name: _package.name,
      recipientId: _package.recipientId,
      status: _package.status.toValue(),
      createdAt: _package.createdAt,
      updatedAt: _package.updatedAt
    }
  }

}
