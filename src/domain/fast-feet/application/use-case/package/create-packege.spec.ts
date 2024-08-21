import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { CreatePackageUseCase } from './create-package'
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
    const user = await User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      packageId: [],
      createdAt: new Date(),
    })

    const recipient = await Recipient.create({
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
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject().toValue(),
      createdAt: new Date(),
    })
    expect(inMemoryPackage.items).toHaveLength(1)
  })
})
