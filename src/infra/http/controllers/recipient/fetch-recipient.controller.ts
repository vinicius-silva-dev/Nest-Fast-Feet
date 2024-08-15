/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { GetRecipientByIdUseCase } from 'src/domain/fast-feet/application/use-case/recipients/get-recipient-by-id';


@Controller('/recipient/:id')
export class FetchUsersController {
  constructor(private getRecipient: GetRecipientByIdUseCase) {}

  @Get()
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
