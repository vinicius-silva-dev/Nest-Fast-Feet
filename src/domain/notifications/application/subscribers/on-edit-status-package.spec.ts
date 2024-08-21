/* eslint-disable no-new */
import { describe, expect, it, MockInstance, vi, beforeEach } from 'vitest'
import { InMemoryPackage } from '../../../../../test/repository/in-memory-packege'
import { SendNotificationsUseCase } from '../user-case/send-notification'
import { InMemoryNotifications } from '../../../../../test/repository/in-memory-notifications'
import { waitFor } from '../../../../../utils/wait-for'
import { OnEditStatusPackage } from './on-edit-status-package'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'

let inMemoryPackage: InMemoryPackage
let inMemoryNotification: InMemoryNotifications
let sendNotifications: SendNotificationsUseCase

let sendNotificationExecuteSpy: MockInstance
describe('On change status package', () => {
  beforeEach(() => {
    inMemoryPackage = new InMemoryPackage()
    inMemoryNotification = new InMemoryNotifications()
    sendNotifications = new SendNotificationsUseCase(inMemoryNotification)

    sendNotificationExecuteSpy = vi.spyOn(sendNotifications, 'execute')

    new OnEditStatusPackage(inMemoryPackage, sendNotifications)
  })
  it.only('should be abble to change status to package', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      packageId: [],
      createdAt: new Date(),
    })

    const recipient = Recipient.create({
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

    const _package = await Package.create({
      name: 'Vinicius Silva',
      userId: user.id.toString(),
      recipientId: recipient.id.toString(),
      status: new StatusValueObject().toValue(),
      createdAt: new Date(),
    })

    await inMemoryPackage.create(_package)

    _package.status = 'retirado'

    await inMemoryPackage.save(_package)

    const notification = await sendNotifications.execute({
      recipientId: recipient.id.toString(),
      title: 'Notificação',
      content: `Pedido foi alterado para ${_package.status} :)`,
    })

    console.log(notification.notification)
    expect(sendNotifications).toBeDefined()

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
      expect(inMemoryPackage.items).toHaveLength(1)
    })
  })
})
