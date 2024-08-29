/* eslint-disable prettier/prettier */
import { AttachmentRepository } from 'src/domain/fast-feet/application/repository/attachment-repository'
import { Attachments } from 'src/domain/fast-feet/enteprise/entities/attachment'

export class InMemoryAttachments implements AttachmentRepository {
  public items: Attachments[] = []
  
  async create(attachment: Attachments): Promise<void> {
    this.items.push(attachment)
  }

  async findById(id: string): Promise<Attachments | null> {
    const result = await this.items.find(item => item.id.toString() === id)

    return result
  }
}
