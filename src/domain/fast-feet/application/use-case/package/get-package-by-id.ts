import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PackageRepository } from '../../repository/package-repository'
import { Injectable } from '@nestjs/common'

interface GetPackageByIdRequest {
  id: string
}

type GetPackageByIdResponse = {
  _package: Package
}
@Injectable()
export class GetPackageByIdUseCase {
  constructor(private packageRepository: PackageRepository) {}
  async execute({
    id,
  }: GetPackageByIdRequest): Promise<GetPackageByIdResponse> {
    const _package = await this.packageRepository.findById(id)

    if (!_package) {
      throw new Error('Package not found')
    }

    return {
      _package,
    }
  }
}
