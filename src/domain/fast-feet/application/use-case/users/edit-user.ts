import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UserRepository } from '../../repository/user-repository'

interface EditUserRequest {
  id: string
  name: string
  cpf: string
  password: string
  role: string
}

type EditUserResponse = {
  user: User
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    id,
    password,
    role,
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    user.role = role
    user.password = password

    await this.userRepository.save(user)

    return { user }
  }
}
