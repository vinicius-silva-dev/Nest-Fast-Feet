/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateUserController } from './controllers/users/create-user.controller'
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUseCase } from 'src/domain/fast-feet/application/use-case/users/authenticate'
import { CryptographyModule } from '../jwt-service/cryptography.module'
import { CreateRecipientController } from './controllers/recipient/create-recipient.controller'
import { CreateRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/create-recipients'
import { EditUserUseCase } from 'src/domain/fast-feet/application/use-case/users/edit-user'
import { EditUserController } from './controllers/users/edit-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController, 
    CreateRecipientController,
    EditUserController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUseCase,
    CreateRecipientsUseCase,
    EditUserUseCase
  ]
})
export class HttpModule {}
