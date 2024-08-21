import { DomainEvents } from 'src/core/events/domain-events'
import { EventHandler } from 'src/core/events/event-handler'
import { PackageRepository } from 'src/domain/fast-feet/application/repository/package-repository'
import { EditStatusPackageEvent } from 'src/domain/fast-feet/enteprise/events/edit-status'
import { SendNotificationsUseCase } from '../user-case/send-notification'

export class OnEditStatusPackage implements EventHandler {
  constructor(
    private packageRepository: PackageRepository,
    private sendNotifications: SendNotificationsUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewStatusPackageNotification.bind(this),
      EditStatusPackageEvent.name,
    )
  }

  private async sendNewStatusPackageNotification({
    packageEntity,
  }: EditStatusPackageEvent) {
    const _package = await this.packageRepository.findById(
      packageEntity.id.toString(),
    )

    if (_package && _package?.status !== 'retirado') {
      await this.sendNotifications.execute({
        recipientId: _package.recipientId.toString(),
        title: `Mensagem de alteração do status aguardando para ${_package.status}`,
        content: `O status da sua encomenda foi alterado para ${_package.status}.`,
      })
    }
  }
}
