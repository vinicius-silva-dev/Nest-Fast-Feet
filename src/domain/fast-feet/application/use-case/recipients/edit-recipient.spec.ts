import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { EditRecipientsUseCase } from './edit-recipient'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'

let inMemoryEdit: InMemoryRecipients
let sut: EditRecipientsUseCase
describe('Edit recipient', async () => {
  beforeEach(() => {
    inMemoryEdit = new InMemoryRecipients()

    sut = new EditRecipientsUseCase(inMemoryEdit)
  })
  test('should be abble to edit recipient', async () => {
    const edit = await Recipient.create({
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

    await inMemoryEdit.create(edit)

    await sut.execute({
      id: new UniqueEntityId('recipient-1'),
      rua: 'Ali Perto',
      numero: 3028,
      bairro: 'Jardim luz',
    })
    expect(inMemoryEdit.items[0]).toMatchObject({
      numero: 3028,
    })
  })
})
