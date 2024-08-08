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

        return {
          privateKey: Buffer.from(privateKey)
        }
      },

    })
  ],
  providers: [
    EnvService
  ]
})
export class Auth {}
