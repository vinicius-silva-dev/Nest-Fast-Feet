/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetPackageByUserUseCase } from 'src/domain/fast-feet/application/use-case/package/get-package-by-user';


@Controller('/package/:id')
export class GetPackageByUser {
  constructor(private getPackagByUser: GetPackageByUserUseCase) {}

  @Get()
  @UseGuards( AuthGuard('jwt'))
  async getPackage(@Param('id') userId: string) {
    const result = await this.getPackagByUser.execute({id: userId})

    if (!result) {
      throw new Error('Package not found!')
    }

    return result._package
  }
}
