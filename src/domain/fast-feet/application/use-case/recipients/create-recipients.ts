import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { RecipientRepository } from '../../repository/recipient-repository'
import { Injectable } from '@nestjs/common'

interface RecipientsRequest {
  id: UniqueEntityId
  name: string
  packageId?: string[]
  rua: string
  numero: number
  bairro: string
  cidade: string
  estado: string
  latitude: number
  longitude: number
}

type RecipientsResponse = {
  recipient: Recipient
}

@Injectable()
export class CreateRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({
    id,
    name,
    packageId,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    latitude,
    longitude,
  }: RecipientsRequest): Promise<RecipientsResponse> {
    const recipient = await Recipient.create({
      id,
      name,
      packageId,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.recipienRepository.create(recipient)

    return {
      recipient,
    }
  }
}
