import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user-repository'

interface DeleteUserRequest {
  id: string
}
@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ id }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    await this.userRepository.delete(user)
  }
}
