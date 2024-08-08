import { DomainEvents } from '../../src/core/events/domain-events'
import {
  FindManyNearbyParams,
  PackageRepository,
} from '../../src/domain/fast-feet/application/repository/package-repository'
import { Package } from '../../src/domain/fast-feet/enteprise/entities/package'
import { getDistanceBetweenCoordinates } from '../../src/utils/get-distance-between-coordinats'

export class InMemoryPackage implements PackageRepository {
  public items: Package[] = []

  async findById(id: string): Promise<Package | null> {
    const result = this.items.find((_package) => _package.id.toString() === id)

    if (!result) {
      return null
    }

    return result
  }

  async findByUser(id: string): Promise<Package[] | null> {
    const result = this.items.filter(
      (_package) => _package.id.toString() === id,
    )

    if (!result) {
      return null
    }

    return result
  }

  async findManyNearby(
    params: FindManyNearbyParams,
  ): Promise<Package[] | null> {
    // Esse método não será utilizado no momento.
    return this.items.filter(() => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: 0,
          longitude: 0,
        },
      )
      return distance < 3
    })
  }

  async save(_package: Package): Promise<void> {
    const packageIndex = await this.items.findIndex(
      (index) => index.id === _package.id,
    )

    this.items[packageIndex] = _package
    DomainEvents.dispatchEventsForAggregate(_package.id)
  }

  async create(_package: Package) {
    this.items.push(_package)

    DomainEvents.dispatchEventsForAggregate(_package.id)
  }

  async delete(_package: Package): Promise<void> {
    const packageIndex = await this.items.findIndex(
      (index) => index.id === _package.id,
    )

    this.items.splice(packageIndex, 1)
  }
}
