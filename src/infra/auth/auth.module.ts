/* eslint-disable prettier/prettier */
import 'dotenv'
import { Module } from '@nestjs/common'
// import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
// import { JwtAuthGuard } from './jwt-auth';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
// import { RoleAdmin } from '../middleware/role-admin';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        
        const privateKey = env.get('JWT_PRIVATE_KEY')
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
    JwtStrategy,
    EnvService,  
    {
      provide: APP_GUARD,
      useClass: JwtStrategy,
    },
  
  ]
})
export class AuthModule {}
