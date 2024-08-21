import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
import { PackageRepository } from '../../repository/package-repository'
import { Injectable } from '@nestjs/common'

interface PackageRequest {
  id: UniqueEntityId
  status: StatusValueObject
}

type PackageResponse = {
  _package: Package
}
@Injectable()
export class EditPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ id, status }: PackageRequest): Promise<PackageResponse> {
    const _package = await this.packageRepository.findById(id.toString())

    if (!_package) {
      throw new Error('Package not found')
    }

    _package.status = status.toValue()

    await this.packageRepository.save(_package)

    return {
      _package,
    }
  }
}
