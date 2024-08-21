/* eslint-disable prettier/prettier */
import { NotificationsRepository } from 'src/domain/notifications/application/repository/notification-repository';
import { PrismaService } from '../prisma.service'
import { Notification } from 'src/domain/notifications/entities/notification';
import { PrismaNotificationMappers } from '../mappers/prisma-notification-mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id
      }
    })

    if(!notification) {
      throw new Error('Notification not found')
    }

    return PrismaNotificationMappers.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMappers.toPrisma(notification)

    await this.prisma.notification.create({
      data
    })

   
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMappers.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: data.id
      },
      data
    })
  }
}
