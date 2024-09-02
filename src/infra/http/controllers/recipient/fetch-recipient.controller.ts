/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetRecipientByIdUseCase } from 'src/domain/fast-feet/application/use-case/recipients/get-recipient-by-id';


@Controller('/recipient/:id')
export class FetchRecipientController {
  constructor(private getRecipient: GetRecipientByIdUseCase) {}

  @Get()
  @UseGuards( AuthGuard('jwt'))
  async usersFetch(
    @Param('id') recipientId: string
  ) {
    const result = await this.getRecipient.execute({
      recipientId
    })

    if (!result) {
      throw new Error('Users not found !!!')
    }

    return {
      result
    }
  }
}
