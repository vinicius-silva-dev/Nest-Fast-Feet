import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { DeleteRecipientsUseCase } from './delete-recipient'

let inMemoryDelete: InMemoryRecipients
let sut: DeleteRecipientsUseCase
describe('Delete recipient', async () => {
  beforeEach(() => {
    inMemoryDelete = new InMemoryRecipients()

    sut = new DeleteRecipientsUseCase(inMemoryDelete)
  })
  test('should be abble to delete recipient', async () => {
    const recipient = Recipient.create({
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      packageId: [],
    })

    await inMemoryDelete.create(recipient)

    await sut.execute({
      recipientId: recipient.id,
    })

    expect(inMemoryDelete.items).toHaveLength(0)
  })
})
