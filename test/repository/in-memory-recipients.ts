import { RecipientRepository } from 'src/domain/fast-feet/application/repository/recipient-repository'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'

export class InMemoryRecipients implements RecipientRepository {
  public items: Recipient[] = []

  async findById(id: string): Promise<Recipient | null> {
    const result = this.items.find(
      (recipient) => recipient.id.toString() === id,
    )

    if (!result) {
      return null
    }

    return result
  }

  async save(recipient: Recipient) {
    const result = await this.items.findIndex(
      (index) => index.id === recipient.id,
    )

    this.items[result] = recipient
  }

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }

  async delete(recipient: Recipient) {
    const result = await this.items.findIndex(
      (index) => index.id === recipient.id,
    )

    this.items.splice(result, 1)
  }
}
