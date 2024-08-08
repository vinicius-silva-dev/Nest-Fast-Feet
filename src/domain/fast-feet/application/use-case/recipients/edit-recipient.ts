import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { RecipientRepository } from '../../repository/recipient-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface RecipientsRequest {
  id: UniqueEntityId
  rua: string
  numero: number
  bairro: string
}

type RecipientsResponse = {
  recipient: Recipient
}
export class EditRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({
    id,
    rua,
    numero,
    bairro,
  }: RecipientsRequest): Promise<RecipientsResponse> {
    const recipient = await this.recipienRepository.findById(id.toString())

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    recipient.rua = rua
    recipient.numero = numero
    recipient.bairro = bairro

    await this.recipienRepository.save(recipient)

    return {
      recipient,
    }
  }
}
