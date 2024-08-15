import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { GetUserByIdUseCase } from './get-user-by-id'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

let inMemoryUser: InMemoryUser
let sut: GetUserByIdUseCase
describe('Get user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new GetUserByIdUseCase(inMemoryUser)
  })
  test('should be abble to get user by id', async () => {
    const user = await User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })
    inMemoryUser.create(user)

    const result = await sut.execute({
      id: user.id.toString(),
    })

    expect(result.user).toEqual(
      expect.objectContaining({
        id: new UniqueEntityId('user-1'),
      }),
    )
  })
})
