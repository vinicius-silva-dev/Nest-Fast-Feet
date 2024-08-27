/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/fast-feet/application/repository/user-repository';
import { PrismaUserRepository } from './prisma/repository/prisma-user-repository';
import { RecipientRepository } from 'src/domain/fast-feet/application/repository/recipient-repository';
import { PrismaRecipientRepository } from './prisma/repository/prisma-recipient-repository';
import { PackageRepository } from 'src/domain/fast-feet/application/repository/package-repository';
import { PrismaPackageRepository } from './prisma/repository/prisma-package-repository';
import { NotificationsRepository } from 'src/domain/notifications/application/repository/notification-repository';
import { PrismaNotificationRepository } from './prisma/repository/prisma-notification-repository';
import { AttachmentRepository } from 'src/domain/fast-feet/application/repository/attachment-repository';
import { PrismaAttachmentRepository } from './prisma/repository/prisma-attachment-repository';

@Module({
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },

    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository
    },

    {
      provide: PackageRepository,
      useClass: PrismaPackageRepository
    },

    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentRepository
    },

    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository
    }
  ],
  exports: [
    PrismaService,
    UserRepository,
    RecipientRepository,
    PackageRepository,
    NotificationsRepository,
    AttachmentRepository
  ]
})
export class DatabaseModule {}
