import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { DeletePackageUseCase } from './delete-package'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
let inMemoryDelete: InMemoryPackage
let sut: DeletePackageUseCase
describe('Delete package', async () => {
  beforeEach(() => {
    inMemoryDelete = new InMemoryPackage()

    sut = new DeletePackageUseCase(inMemoryDelete)
  })
  test('should be abble to delete package', async () => {
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
      packageId: [],
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: -10.4195882,
      longitude: -62.4741694,
      createdAt: new Date(),
    })
    const _package = await Package.create({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject(),
      createdAt: new Date(),
    })

    await inMemoryDelete.create(_package)

    await sut.execute({
      id: new UniqueEntityId('package-1'),
    })

    expect(inMemoryDelete.items).toHaveLength(0)
  })
})
