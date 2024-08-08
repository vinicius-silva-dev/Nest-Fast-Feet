import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

export class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvents[] = []

  get domainEvents(): DomainEvents[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvents): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
