import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { PackageRepository } from '../../repository/package-repository'

interface GetPackageByUserRequest {
  id: string
}

type GetPackageByUserResponse = {
  _package: Package[]
}

export class GetPackageByUserUseCase {
  constructor(private packageRepository: PackageRepository) {}
  async execute({
    id,
  }: GetPackageByUserRequest): Promise<GetPackageByUserResponse> {
    const _package = await this.packageRepository.findByUser(id)

    if (!_package) {
      throw new Error('Packages not found')
    }

    return {
      _package,
    }
  }
}
