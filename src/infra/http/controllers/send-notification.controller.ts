/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendNotificationsUseCase } from 'src/domain/notifications/application/user-case/send-notification'
import { z } from 'zod';

const envSchema = z.object({
  recipientId: z.string(),
  title: z.string(),
  content: z.string()
})

type Notification = z.infer<typeof envSchema>

@Controller('/notification')
export class SendNotification {
  constructor(private sendNotification: SendNotificationsUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body() body: Notification
  ) {
    const { recipientId, title, content } = body
    const result = await this.sendNotification.execute({
      recipientId,
      title,
      content
    })

    if (!result) {
      throw new Error('Erro ao criar notificação!')
    }

    return result
  }
}
