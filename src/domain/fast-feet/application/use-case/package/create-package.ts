import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PackageRepository } from '../../repository/package-repository'
import { Package } from 'src/domain/fast-feet/enteprise/entities/package'
import { StatusValueObject } from 'src/domain/fast-feet/enteprise/entities/value-object/status'
import { Recipient } from 'src/domain/fast-feet/enteprise/entities/recipient'

interface PackageRequest {
  id: UniqueEntityId
  name: string
  userId: string
  recipient: Recipient
  status: StatusValueObject
  createdAt: Date
}

type PackageResponse = {
  _package: Package
}
export class CreatePackageUseCase {
  constructor(private recipienRepository: PackageRepository) {}

  async execute({
    id,
    name,
    userId,
    recipient,
    status,
    createdAt,
  }: PackageRequest): Promise<PackageResponse> {
    const _package = await Package.create({
      id,
      name,
      userId,
      recipientId: recipient.id.toString(),
      status,
      createdAt,
    })

    await this.recipienRepository.create(_package)

    return {
      _package,
    }
  }
}
