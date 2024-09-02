import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common'
import { DatabaseModule } from './infra/database/database.module'
import { EnvModule } from './env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
// import { ValidateRoles } from './infra/middleware/validate-roles'

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
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(ValidateRoles)
  //     .forRoutes({ path: 'package', method: RequestMethod.PUT })
  // }
}
