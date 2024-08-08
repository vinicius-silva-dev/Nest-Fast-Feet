import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { DomainEvent } from 'src/core/events/domain-event'
import { Package } from '../entities/package'
import { Status } from '../entities/value-object/status'

export class EditStatusPackageEvent implements DomainEvent {
  public ocurredAt: Date
  public packageEntity: Package
  public status: Status

  constructor(_package: Package, status: Status) {
    this.packageEntity = _package
    this.ocurredAt = new Date()
    this.status = status
  }

  getAggregateId(): UniqueEntityId {
    return this.packageEntity.id
  }
}
