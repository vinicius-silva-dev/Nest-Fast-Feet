import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { FetchUsers } from './fetch-users'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

let inMemoryUser: InMemoryUser
let sut: FetchUsers
describe('Fetch users', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new FetchUsers(inMemoryUser)
  })
  test('should be abble to fetch user by params', async () => {
    const user1 = await User.create({
      id: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })

    inMemoryUser.create(user1)

    const user2 = await User.create({
      id: new UniqueEntityId('user-2'),
      name: 'Marcos Santos',
      cpf: '000.200.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date(),
    })

    inMemoryUser.create(user2)

    const user3 = await User.create({
      id: new UniqueEntityId('user-3'),
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
