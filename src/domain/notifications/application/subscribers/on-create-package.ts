import { DomainEvents } from 'src/core/events/domain-events'
import { EventHandler } from 'src/core/events/event-handler'
import { PackageRepository } from 'src/domain/fast-feet/application/repository/package-repository'
import { CreatePackageEvent } from 'src/domain/fast-feet/enteprise/events/create-package'
import { SendNotificationsUseCase } from '../user-case/send-notification'

export class OnCreatePackage implements EventHandler {
  constructor(
    private packageRepository: PackageRepository,
    private sendNotifications: SendNotificationsUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createNewPackageNotification.bind(this),
      CreatePackageEvent.name,
    )
  }

  private async createNewPackageNotification({
    packageEntity,
  }: CreatePackageEvent) {
    const _package = await this.packageRepository.findById(
      packageEntity.id.toString(),
    )

    if (_package) {
      await this.sendNotifications.execute({
        recipientId: _package.recipientId.toString(),
        title: `Mensagem de criação do ${_package.name}.`,
        content: 'Pacote criado e aguardando para ser entregue.',
      })
    }
  }
}
