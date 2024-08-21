/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repository/notification-repository'
import { Notification } from '../../entities/notification';

export interface ReadNotificationRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse  = {
  notification: Notification
}

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId
  }: ReadNotificationRequest): Promise<ReadNotificationUseCaseResponse> {

    const notification = await this.notificationRepository.findById(notificationId)

    if(!notification) {
      throw Error('Notification not found!!')
    }

    if(recipientId !== notification.recipientId) {
      throw Error()
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return {
      notification
    }
  
  }
}
