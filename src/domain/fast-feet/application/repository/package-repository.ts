import { Package } from '../../enteprise/entities/package'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export abstract class PackageRepository {
  abstract findById(id: string): Promise<Package | null>
  abstract findByUser(id: string): Promise<Package[] | null>
  abstract findManyNearby(
    parms: FindManyNearbyParams,
  ): Promise<Package[] | null>

  abstract save(_package: Package): Promise<void>
  abstract create(_package: Package): Promise<void>
  abstract delete(_package: Package): Promise<void>
}
