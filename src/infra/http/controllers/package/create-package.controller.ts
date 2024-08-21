/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePackageUseCase } from 'src/domain/fast-feet/application/use-case/package/create-package'
import { z } from 'zod';

const envSchema = z.object({
  name: z.string(),
  userId: z.string(),
  recipientId: z.string(),
  status: z.enum([
    'aguardando',
    'retirado',
    'entregue',
    'devolvida',
    'cancelado'
  ]).default('aguardando')
})

type _Package = z.infer<typeof envSchema>
@Controller('/package')
export class CreatePackageController {
  constructor(private packageUseCase: CreatePackageUseCase) {}

  @Post()
  async create(
    @Body() body: _Package
  ) {
    const { name, userId, recipientId, status} = body
    await this.packageUseCase.execute({
      name,
      userId,
      recipientId,
      status,
      createdAt: new Date()
    })

  }
}
