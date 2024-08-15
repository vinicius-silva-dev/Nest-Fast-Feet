import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { RecipientRepository } from '../../repository/recipient-repository'
import { Injectable } from '@nestjs/common'

interface RecipientsRequest {
  id: string
  rua: string
  numero: number
  bairro: string
  latitude: number
  longitude: number
}

type RecipientsResponse = {
  recipient: Recipient
}
@Injectable()
export class EditRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({
    id,
    rua,
    numero,
    bairro,
    latitude,
    longitude,
  }: RecipientsRequest): Promise<RecipientsResponse> {
    const recipient = await this.recipienRepository.findById(id)

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    recipient.rua = rua
    recipient.numero = numero
    recipient.bairro = bairro
    recipient.latitude = latitude
    recipient.longitude = longitude

    await this.recipienRepository.save(recipient)

    return {
      recipient,
    }
  }
}
