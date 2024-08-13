import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { CreatePackageUseCase } from './create-package'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'

let inMemoryPackage: InMemoryPackage
let sut: CreatePackageUseCase
describe('Create recipient', async () => {
  beforeEach(() => {
    inMemoryPackage = new InMemoryPackage()

    sut = new CreatePackageUseCase(inMemoryPackage)
  })
  test('should be abble to create recipient', async () => {
    await User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date(),
    })

    const recipient = await Recipient.create({
      id: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      packageId: [],
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
    })
    await sut.execute({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      recipient,
      status: new StatusValueObject(),
      createdAt: new Date(),
    })
    expect(inMemoryPackage.items).toHaveLength(1)
  })
})
