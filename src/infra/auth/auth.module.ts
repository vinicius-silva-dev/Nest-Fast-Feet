/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        
        const privateKey = env.get('JWT_SECRET')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64')
        }
      },

    })
  ],
  providers: [
    EnvService
  ]
})
export class Auth {}
