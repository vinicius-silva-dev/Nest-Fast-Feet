import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { DeleteUserUseCase } from './delete-user'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

let inMemoryUser: InMemoryUser
let sut: DeleteUserUseCase
describe('Delete user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new DeleteUserUseCase(inMemoryUser)
  })
  test('should be abble to delete user', async () => {
    const user = await User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      packageId: [],
      createdAt: new Date(),
    })

    await inMemoryUser.create(user)

    await sut.execute({
      id: 'user-1',
    })

    expect(inMemoryUser.items).toHaveLength(0)
  })
})
