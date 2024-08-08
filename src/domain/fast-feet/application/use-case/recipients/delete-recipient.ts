import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { RecipientRepository } from '../../repository/recipient-repository'

interface RecipientsRequest {
  recipientId: UniqueEntityId
}

export class DeleteRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({ recipientId }: RecipientsRequest) {
    const recipient = await this.recipienRepository.findById(
      recipientId.toString(),
    )

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    await this.recipienRepository.delete(recipient)
  }
}
