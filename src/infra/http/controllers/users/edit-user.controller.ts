/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';

import { EditUserUseCase } from 'src/domain/fast-feet/application/use-case/users/edit-user';
import { z } from 'zod';

const userSchema = z.object({
  password: z.string(),
  role: z.enum(['Admin', 'Entregador']).default('Entregador')
})

// z.enum(["AGUARDANDO", "RETIRADO", "ENTREGUE", "DEVOLVIDO", "CANCELADO"]).default("AGUARDANDO")
type User = z.infer<typeof userSchema>

@Controller('/user/:id')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) { }

  @Put()
  @HttpCode(204)
  async editUser(
    @Body() body: User,
    @Param('id') userId: string
  ) {
    const { password, role } = body

    const result = await this.editUserUseCase.execute({
      id: userId,
      password,
      role,

    })
   
    if (!result) {
      throw new Error()
    }
  }
}
