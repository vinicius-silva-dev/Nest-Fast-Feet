import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UserRepository } from '../../repository/user-repository'
import { hash } from 'bcrypt'
import { Injectable } from '@nestjs/common'

interface CreateUserRequest {
  // id: string
  name: string
  cpf: string
  password: string
  role: string
  createdAt: Date
}

type CreateUserResponse = {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    name,
    cpf,
    password,
    role,
    createdAt,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await User.create({
      id: new UniqueEntityId(),
      name,
      cpf,
      password: await hash(password, 8),
      role,
      createdAt,
    })

    await this.userRepository.create(user)

    return { user }
  }
}
