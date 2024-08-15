import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { CreateRecipientsUseCase } from './create-recipients'

let inMemoryRecipients: InMemoryRecipients
let sut: CreateRecipientsUseCase
describe('Create recipient', async () => {
  beforeEach(() => {
    inMemoryRecipients = new InMemoryRecipients()

    sut = new CreateRecipientsUseCase(inMemoryRecipients)
  })
  test('should be abble to create recipient', async () => {
    await sut.execute({
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      packageId: [],
      latitude: 0,
      longitude: 0,
    })

    expect(inMemoryRecipients.items).toHaveLength(1)
  })
})
