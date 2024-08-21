import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PackageRepository } from '../../repository/package-repository'
import { Injectable } from '@nestjs/common'

interface PackagesRequest {
  id: UniqueEntityId
}
@Injectable()
export class DeletePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ id }: PackagesRequest) {
    const _package = await this.packageRepository.findById(id.toString())

    if (!_package) {
      throw new Error('Package not found')
    }

    await this.packageRepository.delete(_package)
  }
}
