/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateUserController } from './controllers/create-user.controller'
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserUseCase
  ]
})
export class HttpModule {}
