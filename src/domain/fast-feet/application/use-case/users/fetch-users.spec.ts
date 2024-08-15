import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { FetchUsersUseCase } from './fetch-users'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

let inMemoryUser: InMemoryUser
let sut: FetchUsersUseCase
describe('Fetch users', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new FetchUsersUseCase(inMemoryUser)
  })
  test('should be abble to fetch user by params', async () => {
    const user1 = await User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })

    inMemoryUser.create(user1)

    const user2 = await User.create({
      name: 'Marcos Santos',
      cpf: '000.200.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date(),
    })

    inMemoryUser.create(user2)

    const user3 = await User.create({
      name: 'José Silva',
      cpf: '010.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date(),
    })

    inMemoryUser.create(user3)

    const result = await sut.execute({
      role: 'admin',
    })

    expect(result.users).toHaveLength(1)
  })
})
