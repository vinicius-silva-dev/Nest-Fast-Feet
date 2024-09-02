/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { EditRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/edit-recipient'
import { z } from 'zod'

const recipientSchema = z.object({
  rua: z.string(),
  numero: z.number(),
  bairro: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type Recipient = z.infer<typeof recipientSchema>

@Controller('/recipient/:id')
export class EditRecipientController {
  constructor(private editRecipientUseCase: EditRecipientsUseCase) {}

  @Put()
  @UseGuards( AuthGuard('jwt'))
  @HttpCode(204)
  async editRecipient(
    @Body() body: Recipient,
    @Param('id') recipientId: string
  ) {
    const {
      rua,
      numero,
      bairro,
      latitude,
      longitude,
    } = body
    // console.log(recipientId)
    const result = await this.editRecipientUseCase.execute({
      id: recipientId,
      rua,
      numero,
      bairro,
      latitude,
      longitude,
    })

    if (!result) {
      throw new Error()
    }
  }
}
