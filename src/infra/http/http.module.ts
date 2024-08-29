/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateUserController } from './controllers/users/create-user.controller'
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user'
import { AuthenticateController } from './controllers/users/authenticate.controller'
import { AuthenticateUseCase } from 'src/domain/fast-feet/application/use-case/users/authenticate'
import { EditUserUseCase } from 'src/domain/fast-feet/application/use-case/users/edit-user'
import { EditUserController } from './controllers/users/edit-user.controller'
import { DeleteUserController } from './controllers/users/delete-user.controller'
import { DeleteUserUseCase } from 'src/domain/fast-feet/application/use-case/users/delete-user'
import { FetchUsersController } from './controllers/users/fetch-users.controller'
import { FetchUsersUseCase } from 'src/domain/fast-feet/application/use-case/users/fetch-users'

import { CryptographyModule } from '../jwt-service/cryptography.module'

import { CreateRecipientController } from './controllers/recipient/create-recipient.controller'
import { CreateRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/create-recipients'
import { EditRecipientController } from './controllers/recipient/edit-recipient.controller'
import { EditRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/edit-recipient'
import { DeleteRecipientController } from './controllers/recipient/delete-recipient.controller'
import { DeleteRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/delete-recipient'
import { FetchRecipientController } from './controllers/recipient/fetch-recipient.controller'
import { GetRecipientByIdUseCase } from 'src/domain/fast-feet/application/use-case/recipients/get-recipient-by-id'

import { CreatePackageController } from './controllers/package/create-package.controller'
import { CreatePackageUseCase } from 'src/domain/fast-feet/application/use-case/package/create-package'
import { EditPackageController } from './controllers/package/edit-package.controller'
import { EditPackageUseCase } from 'src/domain/fast-feet/application/use-case/package/edit-package'
import { DeletePackageUseCase } from 'src/domain/fast-feet/application/use-case/package/delete-package'
import { DeletePackageController } from './controllers/package/delete-package.controller'
import { GetPackageByUserUseCase } from 'src/domain/fast-feet/application/use-case/package/get-package-by-user'
import { GetPackageByUser } from './controllers/package/get-package-by-user.controller'
import { FetchNearbyPackageController } from './controllers/package/fetch-nearby-package.controller'
import { FetchNearbyPackageUseCase } from 'src/domain/fast-feet/application/use-case/package/fetch-nearby-package'
import { SendNotification } from './controllers/send-notification.controller'
import { SendNotificationsUseCase } from 'src/domain/notifications/application/user-case/send-notification'
import { ReadNotificationUseCase } from 'src/domain/notifications/application/user-case/read-notification'
import { readNotification } from './controllers/read-notification.controller'
import { UploadFileController } from './controllers/attachment/upload-file.controller'
import { UploadFileUseCase } from 'src/domain/fast-feet/application/use-case/upload-file'
import { StorageModule } from './storage/storage.module'
import { GetAttachmentByUserUseCase } from 'src/domain/fast-feet/application/use-case/get-attachment-by-id'
import { GetAttachmentByUser } from './controllers/attachment/get-attachment-by-id.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateUserController,
    FetchUsersController,
    AuthenticateController, 
    EditUserController,
    DeleteUserController,

    CreateRecipientController,
    EditRecipientController,
    FetchRecipientController,
    DeleteRecipientController,

    CreatePackageController,
    EditPackageController,
    DeletePackageController,
    GetPackageByUser,
    FetchNearbyPackageController,

    SendNotification,
    readNotification,

    UploadFileController,
    GetAttachmentByUser
    
  ],
  providers: [
    CreateUserUseCase,
    FetchUsersUseCase,
    AuthenticateUseCase,
    EditUserUseCase,
    DeleteUserUseCase,

    CreateRecipientsUseCase,
    EditRecipientsUseCase,
    GetRecipientByIdUseCase,
    DeleteRecipientsUseCase,

    CreatePackageUseCase,
    EditPackageUseCase,
    DeletePackageUseCase,
    GetPackageByUserUseCase,
    FetchNearbyPackageUseCase,

    SendNotificationsUseCase,
    ReadNotificationUseCase,

    UploadFileUseCase,
    GetAttachmentByUserUseCase
  ]
})
export class HttpModule {}
