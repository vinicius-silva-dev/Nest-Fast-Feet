/* eslint-disable prettier/prettier */
import { UserRepository } from 'src/domain/fast-feet/application/repository/user-repository'
import { User } from 'src/domain/fast-feet/enteprise/entities/user'
import { PrismaService } from '../prisma.service'
import { PrismaUserMappers } from '../mappers/prisma-user-mappers'


export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService
  ) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user)
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf
      }
    })

    if (!user) {
      return null
    }

    return PrismaUserMappers.toDomain(user)
  }

  async findByRole(role: string): Promise<User[] | null> {
    const user = await this.prisma.user.findMany({
      where: {
        role
      },
    })

    if (!user) {
      return null
    }

    return user.map(PrismaUserMappers.toDomain)
  }

  async create(user: User): Promise<void> {
    try {
      const data = PrismaUserMappers.toPrisma(user)
      console.log(data)
      await this.prisma.user.create({
        data
      })
    } catch (error) {
      console.log('Deu ruim', error)
    }

  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMappers.toPrisma(user)
    await this.prisma.user.update({
      where: {
        id: data.id
      },
      data
    })
  }


  async delete(user: User): Promise<void> {
    const data = PrismaUserMappers.toPrisma(user)
    await this.prisma.user.delete({
      where: {
        id: data.id
      }
    })
  }

}
