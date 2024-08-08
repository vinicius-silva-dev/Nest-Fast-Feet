import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { RecipientRepository } from '../../repository/recipient-repository'

interface GetRecipientByIdRequest {
  recipientId: string
}

type GetRecipientByIdResponse = {
  recipient: Recipient
}

export class GetRecipientByIdUseCase {
  constructor(private recipientRepository: RecipientRepository) {}
  async execute({
    recipientId,
  }: GetRecipientByIdRequest): Promise<GetRecipientByIdResponse> {
    const recipient = await this.recipientRepository.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    return {
      recipient,
    }
  }
}
