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
import { DeleteUserController } from './controllers/users/delete-user.controller'
import { DeleteUserUseCase } from 'src/domain/fast-feet/application/use-case/users/delete-user'
import { EditRecipientController } from './controllers/recipient/edit-recipient.controller'
import { EditRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/edit-recipient'
import { FetchUsersController } from './controllers/users/fetch-users.controller'
import { FetchUsersUseCase } from 'src/domain/fast-feet/application/use-case/users/fetch-users'
import { DeleteRecipientController } from './controllers/recipient/delete-recipient.controller'
import { DeleteRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/delete-recipient'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    FetchUsersController,
    AuthenticateController, 
    EditUserController,
    DeleteUserController,

    CreateRecipientController,
    EditRecipientController,
    DeleteRecipientController
  ],
  providers: [
    CreateUserUseCase,
    FetchUsersUseCase,
    AuthenticateUseCase,
    EditUserUseCase,
    DeleteUserUseCase,

    CreateRecipientsUseCase,
    EditRecipientsUseCase,
    DeleteRecipientsUseCase
  ]
})
export class HttpModule {}
