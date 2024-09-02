/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FetchUsersUseCase } from 'src/domain/fast-feet/application/use-case/users/fetch-users'


@Controller('/user/:role')
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersUseCase) {}

  @Get()
  @UseGuards( AuthGuard('jwt'))
  async usersFetch(
    @Param('role') role: string
  ) {
    const result = await this.fetchUsers.execute({
      role
    })

    if (!result) {
      throw new Error('Users not found !!!')
    }

    return {
      result
    }
  }
}
