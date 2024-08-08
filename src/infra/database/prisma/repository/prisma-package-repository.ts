/* eslint-disable prettier/prettier */
import { FindManyNearbyParams, PackageRepository } from 'src/domain/fast-feet/application/repository/package-repository'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PrismaService } from '../prisma.service'
import { PrismaPackageMappers } from '../mappers/prisma-package-mappers'
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinats'
// import { PrismaPackageMappers } from '../mappers/prisma-package-mappers'


export class PrismaPackageRepository implements PackageRepository {
  constructor(
    private prisma: PrismaService
  ) {

  }

  async findById(id: string): Promise<Package | null> {
    const _package = await this.prisma.package.findUnique({
      where: {
        id
      }
    })

    if (!_package) {
      return null
    }

    return PrismaPackageMappers.toDomain(_package)
  }

  async findByUser(id: string): Promise<Package[] | null> {
    const _package = await this.prisma.package.findMany({
      where: {
        id: id
      }
    })

    if (!_package) {
      return null
    }

    return _package.map(PrismaPackageMappers.toDomain)
  }

  async findManyNearby(parms: FindManyNearbyParams): Promise<Package[] | null> {
    const _package = await this.prisma.package.findMany()

    if (!_package) {
      return null
    }


    const packageByDistance = _package.filter(async (item) => {
      const recipient = await this.prisma.recipient.findUnique({
        where: {
          id: item.recipientId
        }
      })
      const distance = getDistanceBetweenCoordinates(
        { latitude: parms.latitude, longitude: parms.longitude },
        {
          latitude: Number(recipient.latitude),
          longitude: Number(recipient.longitude)
        }
      )

      return distance < 3
    })

    console.log(packageByDistance)
    return packageByDistance.map(PrismaPackageMappers.toDomain)
  }


  async create(_package: Package): Promise<void> {
    const data = PrismaPackageMappers.toPrisma(_package)
    await this.prisma.package.create({
      data
    })
  }

  async save(_package: Package): Promise<void> {
    const data = PrismaPackageMappers.toPrisma(_package)
    await this.prisma.package.update({
      where: {
        id: data.id
      },
      data
    })
  }


  async delete(_package: Package): Promise<void> {
    const data = PrismaPackageMappers.toPrisma(_package)
    await this.prisma.package.delete({
      where: {
        id: data.id
      }
    })
  }

}
