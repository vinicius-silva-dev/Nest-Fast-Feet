/* eslint-disable prettier/prettier */
import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { DeleteRecipientsUseCase } from 'src/domain/fast-feet/application/use-case/recipients/delete-recipient'

@Controller('/recipient/:id')
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientsUseCase) {}

  @Delete()
  @UseGuards( AuthGuard('jwt'))
  @HttpCode(204)
  async delete(@Param('id') recipientId: UniqueEntityId) {
    await this.deleteRecipient.execute({
      recipientId
    })
  }
}
