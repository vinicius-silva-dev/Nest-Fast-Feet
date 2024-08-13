/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/fast-feet/application/repository/user-repository';
import { PrismaUserRepository } from './prisma/repository/prisma-user-repository';
import { RecipientRepository } from 'src/domain/fast-feet/application/repository/recipient-repository';
import { PrismaRecipientRepository } from './prisma/repository/prisma-recipient-repository';

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
    }
  ],
  exports: [
    PrismaService,
    UserRepository,
    RecipientRepository
  ]
})
export class DatabaseModule {}
