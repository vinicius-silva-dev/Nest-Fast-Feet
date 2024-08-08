/* eslint-disable no-new */
import { describe, expect, it, MockInstance, vi, beforeEach } from 'vitest'
import { InMemoryPackage } from '../../../../../test/repository/in-memory-packege'
import { OnCreatePackage } from './on-create-package'
import { SendNotifications } from '../user-case/send-notification'
import { InMemoryNotifications } from '../../../../../test/repository/in-memory-notifications'
import { waitFor } from '../../../../../utils/wait-for'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'

let inMemoryPackage: InMemoryPackage
let inMemoryNotification: InMemoryNotifications
let sendNotifications: SendNotifications

let sendNotificationExecuteSpy: MockInstance
describe('On change status package', () => {
  beforeEach(() => {
    inMemoryPackage = new InMemoryPackage()
    inMemoryNotification = new InMemoryNotifications()
    sendNotifications = new SendNotifications(inMemoryNotification)

    sendNotificationExecuteSpy = vi.spyOn(sendNotifications, 'execute')

    new OnCreatePackage(inMemoryPackage, sendNotifications)
  })
  it.only('should be abble to create package', async () => {
    const user = User.create({
      id: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date(),
    })

    const recipient = Recipient.create({
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

    try {
      const _package = await Package.create({
        id: new UniqueEntityId('package-1'),
        name: 'Vinicius Silva',
        userId: user.id.toString(),
        recipientId: recipient.id.toString(),
        status: new StatusValueObject(),
        createdAt: new Date(),
      })
      await inMemoryPackage.create(_package)
    } catch (error) {
      console.log('Deu ruim', error)
    }

    await sendNotifications.execute({
      recipientId: 'user-1',
      title: 'Notificação',
      content: 'Pedido criado com sucesso :)',
    })
    expect(sendNotifications).toBeDefined()

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
