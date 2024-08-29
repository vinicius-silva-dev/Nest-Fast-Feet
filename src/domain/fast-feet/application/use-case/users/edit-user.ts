import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UserRepository } from '../../repository/user-repository'
import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

interface EditUserRequest {
  id: string
  password: string
  role: string
}

type EditUserResponse = {
  user: User
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    id,
    password,
    role,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(id)
    // console.log(id, user)
    if (!user) {
      throw new Error('User not found !!')
    }

    user.role = role
    user.password = await hash(password, 8)

    await this.userRepository.save(user)

    return { user }
  }
}
