// type Status  = {
//   disponivel?: 'disponivel',
//   aguardando?: 'aguardando',
//   cancelado?: 'cancelado',
//   entregue?: 'entregue',
//   devolvida?: 'devolvida',
// }

import { AggregateRoot } from 'src/core/entities/aggregate-root'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreatePackageEvent } from '../events/create-package'
import { StatusValueObject } from './value-object/status'
// import { Recipient } from './recipient'

export interface PackageProps {
  id: UniqueEntityId
  name: string
  recipientId: string
  status: StatusValueObject
  createdAt: Date
  updatedAt?: Date | null
}

export class Package extends AggregateRoot<PackageProps> {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  // get userId() {
  //   return this.props.userId
  // }

  get recipientId() {
    return this.props.recipientId
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set status(status: StatusValueObject) {
    this.props.status = status
  }

  // set userId(userId: string) {
  //   this.props.userId = userId
  // }

  // set recipient(recipient: Recipient) {
  //   this.props.recipient = recipient
  // }

  // set createdAt(createdAt: Date) {
  //   this.props.createdAt = createdAt
  // }

  // set updatedAt(updatedAt: Date) {
  //   this.props.updatedAt = updatedAt
  // }

  static create(props: PackageProps) {
    const _package = new Package(props)
    if (!_package.id) {
      _package.addDomainEvent(new CreatePackageEvent(_package))
    }

    return _package
  }
}
