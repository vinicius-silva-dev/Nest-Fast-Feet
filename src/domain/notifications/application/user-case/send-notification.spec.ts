import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryNotifications } from '../../../../../test/repository/in-memory-notifications'
import { SendNotificationsUseCase } from './send-notification'

let inMemoryNotification: InMemoryNotifications
let sut: SendNotificationsUseCase
describe('Send notification', () => {
  beforeAll(() => {
    inMemoryNotification = new InMemoryNotifications()

    sut = new SendNotificationsUseCase(inMemoryNotification)
  })
  test('shold be abble create notification', async () => {
    await sut.execute({
      recipientId: 'notification-1',
      title: 'Sucesso',
      content: 'Operação bem sucedida',
    })

    expect(inMemoryNotification.items).toHaveLength(1)
  })
})
