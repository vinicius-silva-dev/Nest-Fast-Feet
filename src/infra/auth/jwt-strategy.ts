/* eslint-disable prettier/prettier */
import 'dotenv'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvService } from 'src/env/env.service'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid()
})

export type UserSchema = z.infer<typeof tokenPayloadSchema>
// Aqui criamos a classe JwtStrategy que estende uma função da biblioteca Passport.

// A finalidade dessa classe é validadr se o usuário esta logado, usando a chave publica para verificar o Token

// Para que essa classe funcione precisamos passar o decorator Injectable, todos os providers cadastrados no modulo precisa de decorator para injetar as dependências.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY')

    super({
      // Aqui indica de onde vem o token, neste caso está vindo do header bearer token.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithems: ['RS256']
    })
  }

  // Se dentro do token recebido não for condizente ao tipo informado na variável tokenSchema, vai dar erro.
  async validate(payload: UserSchema) {
    const prisma = new PrismaClient()
    
    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })
    console.log(user)
    if (user.role !== 'admin') {
      throw new Error('Unatorization!!')
    }

    return tokenPayloadSchema.parse(payload)
  }
}