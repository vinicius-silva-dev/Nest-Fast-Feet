/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from 'src/domain/fast-feet/application/cryptography/encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter
    }
  ],
  exports: [Encrypter]
})
export class CryptographyModule {}
