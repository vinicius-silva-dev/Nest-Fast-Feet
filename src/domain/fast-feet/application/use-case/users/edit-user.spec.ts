import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { EditUserUseCase } from './edit-user'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

let inMemoryUser: InMemoryUser
let sut: EditUserUseCase
describe('Edit user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new EditUserUseCase(inMemoryUser)
  })
  test('should be abble to edit user', async () => {
    const user = User.create({
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date(),
    })

    await inMemoryUser.create(user)

    await sut.execute({
      id: user.id.toString(),
      password: user.password,
      role: 'entregador',
    })

    expect(inMemoryUser.items[0]).toMatchObject({
      role: 'entregador',
    })
  })
})
