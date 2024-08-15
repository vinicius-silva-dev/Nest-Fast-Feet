/* eslint-disable prettier/prettier */
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/domain/fast-feet/application/use-case/users/delete-user';

@Controller('/user/:id')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) { }

  @Delete()
  @HttpCode(204)
  async deleteUser(
    @Param('id') userId: string
  ) {

    try {
      await this.deleteUserUseCase.execute({
        id: userId
  
      })
    } catch (error) {
      console.log(error)
    }

  }
}
