import { User } from '../../enteprise/entities/user'

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByCpf(cpf: string): Promise<User | null>
  abstract findByRole(role: string): Promise<User[] | null>
  abstract save(user: User): Promise<void>
  abstract create(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}
