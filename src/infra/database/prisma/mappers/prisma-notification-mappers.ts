/* eslint-disable prettier/prettier */
import {Notification} from 'src/domain/notifications/entities/notification'
import { Prisma, Notification as PrismaNotification } from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
export class PrismaNotificationMappers {
  static toDomain(raw: PrismaNotification) {
    return Notification.create({
      recipientId: raw.recipientId,
      title: raw.title,
      content: raw.content,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    }, new UniqueEntityId(raw.id))
  }

  static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      recipientId: notification.recipientId,
      title: notification.title,
      content: notification.content,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    }
  }

}
