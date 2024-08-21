/* eslint-disable prettier/prettier */
import { FindManyNearbyParams, PackageRepository } from 'src/domain/fast-feet/application/repository/package-repository'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PrismaService } from '../prisma.service'
import { PrismaPackageMappers } from '../mappers/prisma-package-mappers'
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinats'
import { Injectable } from '@nestjs/common'
import { DomainEvents } from 'src/core/events/domain-events'
// import { Recipient } from '@prisma/client'
// import { PrismaPackageMappers } from '../mappers/prisma-package-mappers'

@Injectable()
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
        userId: id
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
    // const packageByDistance = await this.prisma.$queryRaw<Recipient[]>`
    //   SELECT * from recipient
    //   WHERE ( 6371 * acos( cos( radians(${parms.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${parms.longitude}) ) + sin( radians(${parms.latitude}) ) * sin( radians( latitude ) ) ) ) <= 3
    // `;

    // const packageDistance = _package.filter(item => {
    //   const findPackageByDistance = packageByDistance.find(recipient => recipient.id === item.recipientId) 
    //   return item.recipientId === findPackageByDistance.id
    // })

    // const packgeDistance = []
    // for(let i = 0; i <= _package.length; i++) {
    //   const recipientById = _package[i].recipientId
    //   const recipient = await this.prisma.recipient.findFirst({
    //     where: {
    //       id: recipientById
    //     }
    //   })
    //   const distance = getDistanceBetweenCoordinates(
    //     { latitude: parms.latitude, longitude: parms.longitude },
    //     {
    //       latitude: Number(recipient.latitude),
    //       longitude: Number(recipient.longitude)
    //     }
    //   )
    //   if (distance < 3) {
    //         // console.log(_package[i], distance)
    //         packgeDistance.push(_package[i])
    //   }
    // }

    const packageByDistance =  _package.filter(async (item) => {
    
      const recipient = await this.prisma.recipient.findFirst({
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

      if (distance < 3) {
        console.log(item, distance)
        return item
      }
      return null
      
      // return distance < 3
    })

    console.log(packageByDistance)
  
    return packageByDistance.map(PrismaPackageMappers.toDomain)
  }


  async create(_package: Package): Promise<void> {
    const data = PrismaPackageMappers.toPrisma(_package)
    await this.prisma.package.create({
      data
    })

    DomainEvents.dispatchEventsForAggregate(_package.id)
  }

  async save(_package: Package): Promise<void> {
    const data = PrismaPackageMappers.toPrisma(_package)
    await this.prisma.package.update({
      where: {
        id: data.id
      },
      data
    })

    DomainEvents.dispatchEventsForAggregate(_package.id)
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
