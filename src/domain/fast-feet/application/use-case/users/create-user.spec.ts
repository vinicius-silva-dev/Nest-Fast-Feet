import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { CreateUserUseCase } from './create-user'

let inMemoryUser: InMemoryUser
let sut: CreateUserUseCase
describe('Create user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new CreateUserUseCase(inMemoryUser)
  })
  test('should be abble to create user', async () => {
    await sut.execute({
      id: 'user-1',
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })
    expect(inMemoryUser.items).toHaveLength(1)
  })
})
