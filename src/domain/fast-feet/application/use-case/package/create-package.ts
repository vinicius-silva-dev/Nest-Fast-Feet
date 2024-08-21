import { PackageRepository } from '../../repository/package-repository'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
// import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
// import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'
import { Injectable } from '@nestjs/common'

interface PackageRequest {
  name: string
  userId: string
  recipientId: string
  status: string
  createdAt: Date
}

type PackageResponse = {
  _package: Package
}
@Injectable()
export class CreatePackageUseCase {
  constructor(private recipienRepository: PackageRepository) {}

  async execute({
    name,
    userId,
    recipientId,
    status,
    createdAt,
  }: PackageRequest): Promise<PackageResponse> {
    const _package = await Package.create({
      name,
      userId,
      recipientId,
      status,
      createdAt,
    })

    await this.recipienRepository.create(_package)

    return {
      _package,
    }
  }
}
