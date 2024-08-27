import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { DatabaseModule } from './infra/database/database.module'
import { EnvModule } from './env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from './infra/guards/roles.guards'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    // Usando o configModule, estamos importando e validando as variaveis de ambiente.
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // aqui permitimos q essa config seja global, sem precisar repetir em outros arquivos.
    }),
    AuthModule,
    DatabaseModule,
    EnvModule,
    HttpModule,
    JwtModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
