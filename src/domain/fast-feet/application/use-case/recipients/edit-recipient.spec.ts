import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { EditRecipientsUseCase } from './edit-recipient'
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
      id: edit.id.toString(),
      rua: 'Ali Perto',
      numero: 3028,
      bairro: 'Jardim luz',
      latitude: -10.4589549,
      longitude: -62.4639925,
    })
    expect(inMemoryEdit.items[0]).toMatchObject({
      numero: 3028,
    })
  })
})
