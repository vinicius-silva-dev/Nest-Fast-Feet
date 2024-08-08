import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'

interface FetchUsersRequest {
  role: string
}

type FetchUsersResponse = {
  users: User[]
}

export class FetchUsers {
  constructor(private inMemoryUser: InMemoryUser) {}

  async execute({ role }: FetchUsersRequest): Promise<FetchUsersResponse> {
    const users = await this.inMemoryUser.findByRole(role)

    if (!users) {
      throw new Error('Users not found')
    }

    return {
      users,
    }
  }
}
