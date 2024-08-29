import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { EditPackageUseCase } from './edit-package'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import {
  StatusValueObject,
  Status,
} from 'src/domain/fast-feet/enteprise/entities/value-object/status'
import { InMemoryAttachments } from 'test/repository/in-memory-attachments'

let inMemoryEdit: InMemoryPackage
let inMemoryAttachment: InMemoryAttachments
let sut: EditPackageUseCase
describe('Edit package', async () => {
  beforeEach(() => {
    inMemoryEdit = new InMemoryPackage()
    inMemoryAttachment = new InMemoryAttachments()

    sut = new EditPackageUseCase(inMemoryEdit, inMemoryAttachment)
  })
  test('should be abble to edit package', async () => {
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
      name: 'Vinicius Silva',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject().toValue(),
      createdAt: new Date(),
    })

    await inMemoryEdit.create(_package)

    await sut.execute({
      id: new UniqueEntityId('package-1'),
      status: new StatusValueObject(Status.aguardando),
    })
    expect(inMemoryEdit.items[0]).toMatchObject({
      status: new StatusValueObject(Status.aguardando),
    })
  })
})
