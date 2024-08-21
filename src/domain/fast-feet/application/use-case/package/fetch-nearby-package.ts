import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PackageRepository } from '../../repository/package-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

interface FetchNearbyPackageRequest {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyPackageResponse = {
  _package: Package[]
}

@Injectable()
export class FetchNearbyPackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private prisma: PrismaService,
  ) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPackageRequest): Promise<FetchNearbyPackageResponse> {
    const _package = await this.packageRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (_package.length === 0) {
      throw new Error('Package not found')
    }

    return { _package }
  }
}
