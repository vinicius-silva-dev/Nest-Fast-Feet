import { UserRepository } from '../../repository/user-repository'
import { randomUUID } from 'crypto'

interface AuthenticateRequest {
  cpf: string
  password: string
}

type AuthenticateResponse = {
  token: any
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    cpf,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByCpf(cpf)

    if (!user) {
      throw new Error('User not found')
    }

    if (password !== user.password) {
      throw new Error('Invalid authenticate')
    }

    const tokenRandon = {
      token: randomUUID(),
    }

    return {
      token: tokenRandon,
    }
  }
}
