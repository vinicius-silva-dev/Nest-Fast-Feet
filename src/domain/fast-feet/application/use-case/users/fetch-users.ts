import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user-repository'

interface FetchUsersRequest {
  role: string
}

type FetchUsersResponse = {
  users: User[]
}
@Injectable()
export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ role }: FetchUsersRequest): Promise<FetchUsersResponse> {
    const users = await this.userRepository.findByRole(role)

    if (!users) {
      throw new Error('Users not found')
    }

    return {
      users,
    }
  }
}
