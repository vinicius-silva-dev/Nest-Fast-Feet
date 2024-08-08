import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { GetPackageByUserUseCase } from './get-package-by-user'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'

let inMemoryPackages: InMemoryPackage
let sut: GetPackageByUserUseCase
describe('Get package', async () => {
  beforeEach(() => {
    inMemoryPackages = new InMemoryPackage()

    sut = new GetPackageByUserUseCase(inMemoryPackages)
  })
  test('should be abble to get package', async () => {
    const user = await User.create({
      id: new UniqueEntityId('user-1'),
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

    const _package1 = await Package.create({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject(),
      createdAt: new Date(),
    })

    inMemoryPackages.create(_package1)

    const _package2 = await Package.create({
      id: new UniqueEntityId('package-2'),
      name: 'Mouse sem fio',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject(),
      createdAt: new Date(),
    })

    inMemoryPackages.create(_package2)

    const result = await sut.execute({
      id: user.id.toString(),
    })

    expect(result._package).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: new UniqueEntityId('package-1'),
        }),
        expect.objectContaining({
          id: new UniqueEntityId('package-2'),
        }),
      ]),
    )
  })
})
