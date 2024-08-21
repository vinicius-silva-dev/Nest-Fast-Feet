import { Notification } from '../../entities/notification'
import { NotificationsRepository } from '../repository/notification-repository'
import { Injectable } from '@nestjs/common'

export interface SendNotificationsRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationsResponse = {
  notification: Notification
}

@Injectable()
export class SendNotificationsUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationsRequest): Promise<SendNotificationsResponse> {
    const notification = Notification.create({
      recipientId,
      title,
      content,
      createdAt: new Date(),
    })

    await this.notificationRepository.create(notification)

    return {
      notification,
    }
  }
}
