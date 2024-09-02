import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
import { PackageRepository } from '../../repository/package-repository'
import { Injectable } from '@nestjs/common'
import { AttachmentRepository } from '../../repository/attachment-repository'

interface PackageRequest {
  id: UniqueEntityId
  userId: string
  status: StatusValueObject
}

type PackageResponse = {
  _package: Package
}

@Injectable()
export class EditPackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private attachmentRepository: AttachmentRepository,
  ) {}

  async execute({
    id,
    userId,
    status,
  }: PackageRequest): Promise<PackageResponse> {
    const _package = await this.packageRepository.findById(id.toString())

    if (!_package) {
      throw new Error('Package not found')
    }

    const attachment = await this.attachmentRepository.findById(
      _package.id.toString(),
    )

    if (!attachment && status.toValue() === 'entregue') {
      throw new Error('Operation invalid')
    }

    if (_package.userId !== userId) {
      throw new Error('Operation invalid')
    }

    _package.status = status.toValue()

    await this.packageRepository.save(_package)
    console.log(_package)

    return {
      _package,
    }
  }
}
