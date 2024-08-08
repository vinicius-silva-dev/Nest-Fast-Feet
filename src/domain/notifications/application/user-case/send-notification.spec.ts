import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryNotifications } from '../../../../../test/repository/in-memory-notifications'
import { SendNotifications } from './send-notification'

let inMemoryNotification: InMemoryNotifications
let sut: SendNotifications
describe('Send notification', () => {
  beforeAll(() => {
    inMemoryNotification = new InMemoryNotifications()

    sut = new SendNotifications(inMemoryNotification)
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
