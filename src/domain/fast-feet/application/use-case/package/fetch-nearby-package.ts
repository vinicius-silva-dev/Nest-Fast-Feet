import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PackageRepository } from '../../repository/package-repository'

interface FetchNearbyPackageRequest {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyPackageResponse = {
  _package: Package[]
}

export class FetchNearbyPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPackageRequest): Promise<FetchNearbyPackageResponse> {
    const _package = await this.packageRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (!_package) {
      throw new Error('Package not found')
    }

    return {
      _package,
    }
  }
}
