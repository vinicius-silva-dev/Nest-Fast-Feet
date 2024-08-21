/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ReadNotificationUseCase } from 'src/domain/notifications/application/user-case/read-notification';
import { z } from 'zod';

const envSchema = z.object({
  recipientId: z.string(),
})

type Notification = z.infer<typeof envSchema>

@Controller('/notification/:notificationId')
export class readNotification {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Body() body: Notification,
    @Param('notificationId') notificationId: string
  ) {
    const {recipientId} = body
    const result = await this.readNotification.execute({
      recipientId,
      notificationId,
     
    })
  
    if (!result) {
      throw new Error('Erro ao criar notificação!')
    }

    return result.notification
  }
}
