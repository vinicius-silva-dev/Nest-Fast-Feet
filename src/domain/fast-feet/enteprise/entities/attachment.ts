/* eslint-disable prettier/prettier */
import { Entity } from 'src/core/entities/entity'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface AttachmentProps {
  title: string
  url: string
  userId: string
  recipientId: string
  packageId: string
}

export class Attachments extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  get userId() {
    return this.props.userId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get packageId() {
    return this.props.packageId
  }

  static create(props: AttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachments(props, id)

    return attachment
  }
}
