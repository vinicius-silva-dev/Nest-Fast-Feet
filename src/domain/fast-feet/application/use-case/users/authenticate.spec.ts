import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { AuthenticateUseCase } from './authenticate'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

let inMemoryUser: InMemoryUser
let sut: AuthenticateUseCase
describe('Get user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new AuthenticateUseCase(inMemoryUser)
  })
  test('should be abble to get user by id', async () => {
    const user = User.create({
      id: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })

    inMemoryUser.create(user)

    const result = await sut.execute({
      cpf: '000.000.111-85',
      password: '123456',
    })

    expect(result.token).toEqual({
      token: expect.any(String),
    })
  })
})
