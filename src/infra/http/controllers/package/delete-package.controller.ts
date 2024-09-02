/* eslint-disable prettier/prettier */
import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { DeletePackageUseCase } from 'src/domain/fast-feet/application/use-case/package/delete-package'

@Controller('/package/:id')
export class DeletePackageController {
  constructor(private deletePackageUseCase: DeletePackageUseCase) {}

  @Delete()
  @UseGuards( AuthGuard('jwt'))
  @HttpCode(204)
  async deletePackage(@Param('id') packageId: UniqueEntityId) {
    try {
      await this.deletePackageUseCase.execute({
        id: packageId
      })
    } catch (error) {
      console.log(error)
    }
  }
}
