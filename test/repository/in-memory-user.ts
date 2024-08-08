import { UserRepository } from 'src/domain/fast-feet/application/repository/user-repository'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'

export class InMemoryUser implements UserRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const result = this.items.find((user) => user.id.toString() === id)

    if (!result) {
      return null
    }

    return result
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const result = this.items.find((user) => user.cpf === cpf)

    if (!result) {
      return null
    }

    return result
  }

  async findByRole(role: string): Promise<User[] | null> {
    const result = this.items.filter((item) => {
      return item.role === role
    })

    if (!result) {
      return null
    }

    return result
  }

  async create(user: User) {
    this.items.push(user)
  }

  async save(user: User) {
    const userIndex = await this.items.findIndex(
      (index) => index.id === user.id,
    )

    this.items[userIndex] = user
  }

  async delete(user: User) {
    const userIndex = await this.items.findIndex(
      (index) => index.id === user.id,
    )

    if (!userIndex) {
      throw new Error('Not found')
    }

    this.items.splice(userIndex, 1)
  }
}
