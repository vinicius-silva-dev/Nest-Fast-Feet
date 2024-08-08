import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { GetRecipientByIdUseCase } from './get-recipient-by-id'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryRecipients: InMemoryRecipients
let sut: GetRecipientByIdUseCase
describe('Get recipient', async () => {
  beforeEach(() => {
    inMemoryRecipients = new InMemoryRecipients()

    sut = new GetRecipientByIdUseCase(inMemoryRecipients)
  })
  test('should be abble to get recipient', async () => {
    const recipient = await Recipient.create({
      id: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      packageId: [],
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
    })

    inMemoryRecipients.create(recipient)

    const resut = await sut.execute({
      recipientId: recipient.id.toString(),
    })

    expect(resut.recipient).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId('recipient-1'),
      }),
    )
  })
})
