import { NotificationsRepository } from 'src/domain/notifications/application/repository/notification-repository'
import { Notification } from 'src/domain/notifications/entities/notification'

export class InMemoryNotifications implements NotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
