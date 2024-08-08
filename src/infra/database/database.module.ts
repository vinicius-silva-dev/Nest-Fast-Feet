/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/fast-feet/application/repository/user-repository';
import { PrismaUserRepository } from './prisma/repository/prisma-user-repository';

@Module({
  providers: [
    PrismaService,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [
    UserRepository
  ]
})
export class DatabaseModule {}
