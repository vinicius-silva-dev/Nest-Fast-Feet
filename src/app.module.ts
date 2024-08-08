import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { DatabaseModule } from './infra/database/database.module'
import { EnvModule } from './env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { HttpModule } from './infra/http/http.module'

@Module({
  imports: [
    // Usando o configModule, estamos importando e validando as variaveis de ambiente.
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // aqui permitimos q essa config seja global, sem precisar repetir em outros arquivos.
    }),
    DatabaseModule,
    EnvModule,
    HttpModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
