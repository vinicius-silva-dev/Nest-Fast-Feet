/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { EditPackageUseCase } from 'src/domain/fast-feet/application/use-case/package/edit-package'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status';
import { z } from 'zod';

const envSchema = z.object({
  status: z.enum([
    'aguardando',
    'retirado',
    'entregue',
    'devolvida',
    'cancelado'
  ])
})

type PackageSchema = z.infer<typeof envSchema>

@Controller('/package/:id')
export class EditPackageController {
  constructor(private editPackageUseCase: EditPackageUseCase) {}

  @Put()
  @HttpCode(204)
  async editPackage(
    @Body() body: PackageSchema,
    @Param('id') packageId: UniqueEntityId
  ) {
    const {status} = body
    const result = await this.editPackageUseCase.execute({
      id: packageId,
      status: new StatusValueObject(status)
    })

    if (!result) {
      throw new Error('Failed to edit package')
    }

    return result
  }
}