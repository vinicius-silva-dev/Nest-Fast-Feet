/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/create-recipients';
import { z } from 'zod';

const envSchema = z.object({
  name: z.string(),
  rua: z.string(),
  numero: z.number(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number()
})

type RecipientType = z.infer<typeof envSchema>

@Controller('/recipient')
export class CreateRecipientController {
  constructor(
    private recipientUseCase: CreateRecipientsUseCase
  ) {}

  @Post()
  @UseGuards( AuthGuard('jwt'))
  @HttpCode(201)
  async create(@Body() body: RecipientType) {
    const {
      name,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude
    } = body

    const result = await this.recipientUseCase.execute({
      name,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude
    })

    if (!result.recipient) {
      throw new Error('Falha ao criar destinatário')
    }


  }
}
