/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateUserController } from './controllers/users/create-user.controller'
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUseCase } from 'src/domain/fast-feet/application/use-case/users/authenticate'
import { CryptographyModule } from '../jwt-service/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController, AuthenticateController],
  providers: [
    CreateUserUseCase,
    AuthenticateUseCase
  ]
})
export class HttpModule {}
