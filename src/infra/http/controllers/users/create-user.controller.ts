/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from 'src/domain/fast-feet/application/use-case/users/create-user';
import { z } from 'zod';
import { ZodValidationPipes } from '../../pipes/zod-validation-pipes';
// import { CurrentUser } from 'src/infra/auth/current-user-decorator';
// import { UserSchema } from 'src/infra/auth/jwt-strategy';


const userSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'entregador']).default('entregador'),
  packageId: z.array(z.string()).default([])
})

// z.enum(["AGUARDANDO", "RETIRADO", "ENTREGUE", "DEVOLVIDO", "CANCELADO"]).default("AGUARDANDO")
type User = z.infer<typeof userSchema>

@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  // @CurrentUser() user: UserSchema,
  @UsePipes(new ZodValidationPipes(userSchema))
  async create(
    @Body() body: User,
    // @CurrentUser() user: UserSchema,
  ) {
    const { name, cpf, password, role, packageId } = body

    const result = await this.createUserUseCase.execute({
      name,
      cpf,
      password,
      role,
      packageId,
      createdAt: new Date()
    })

    console.log(result.user)
    if (!result) {
      throw new Error('Deu ruim!')
    }
  }
}
