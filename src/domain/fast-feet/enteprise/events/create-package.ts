import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { DomainEvent } from 'src/core/events/domain-event'
import { Package } from '../entities/package'

export class CreatePackageEvent implements DomainEvent {
  public ocurredAt: Date
  public packageEntity: Package

  constructor(_package: Package) {
    this.packageEntity = _package
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.packageEntity.id
  }
}
