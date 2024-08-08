import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UserRepository } from '../../repository/user-repository'

interface GetUserByIdRequest {
  id: string
}

type GetUserByIdResponse = {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ id }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user,
    }
  }
}
