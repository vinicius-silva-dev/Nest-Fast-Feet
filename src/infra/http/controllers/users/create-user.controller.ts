/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  role: z.enum(['Admin', 'Entregador']).default('Entregador'),
  packageId: z.array(z.string()).default([])
})

// z.enum(["AGUARDANDO", "RETIRADO", "ENTREGUE", "DEVOLVIDO", "CANCELADO"]).default("AGUARDANDO")
type User = z.infer<typeof userSchema>

@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  @Post()
  @HttpCode(201)
  async create(@Body() body: User) {
    const { name, cpf, password, role, packageId } = body

    const result = await this.createUserUseCase.execute({
      name,
      cpf,
      password,
      role,
      packageId,
      createdAt: new Date()
    })

    if (!result) {
      throw new Error('Deu ruim!')
    }
  }
}
