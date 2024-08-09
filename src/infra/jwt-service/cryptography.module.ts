/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { Encrypter } from 'src/domain/fast-feet/application/cryptography/encrypter'
// import { JwtService } from '@nestjs/jwt'

@Module({
  providers: [
    // JwtService,
    {
      provide: Encrypter,
      useClass: JwtEncrypter
    }
  ],
  exports: [Encrypter]
})
export class CryptographyModule {}