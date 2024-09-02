/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user-repository'
import { compare } from 'bcrypt'
// import { JwtService } from '@nestjs/jwt'
import { Encrypter } from '../../cryptography/encrypter'

interface AuthenticateRequest {
  cpf: string
  password: string
}

type AuthenticateResponse = {
  token: string
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByCpf(cpf)

    if (!user) {
      throw new Error('User not found')
    }

    const isPassword = await compare(password, user.password)

    if (!isPassword) {
      throw new Error('Invalid authenticate')
    }

    const payload = await this.encrypter.encrypt({ sub: user.id.toString()})

    return {
      token: payload
    }
  }
}
