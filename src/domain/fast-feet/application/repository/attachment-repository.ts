/* eslint-disable prettier/prettier */
import { Attachments } from '../../enteprise/entities/attachment'

export abstract class AttachmentRepository {
  abstract create(attachment: Attachments): Promise<void>
  abstract findById(id: string): Promise<Attachments | null>
}
