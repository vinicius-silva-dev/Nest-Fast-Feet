/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { DatabaseModule } from 'src/infra/database/database.module';

describe('Read Notification e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule],
        providers: [UserFactory]
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    await app.init()
  });

  test('[PATCH] should be abble to read notification E2E', async () => {
  
    const recipient = await prisma.recipient.create({
      data: {
        name: 'Vinicius Silva',
        rua: 'Ali Perto',
        numero: 2544,
        bairro: 'Luz',
        cidade: 'Jaru',
        estado: 'Rondônia',
        latitude: -10.4589548,
        longitude: -62.4639924
      }
        
    })

    const notification = await prisma.notification.create({
      data: {
        recipientId: recipient.id,
        title: 'Notificação',
        content: 'Alteração de status'
      }
    })

    const result = await request(app.getHttpServer()).patch(`/notification/${notification.id}`).send({
      recipientId: recipient.id
    })

   
    expect(result.statusCode).toBe(204)

    const notificationsOnDatabase = await prisma.notification.findFirst({
      where: {
        recipientId: recipient.id.toString()
      }
    })
    console.log(notificationsOnDatabase)
    expect(notificationsOnDatabase?.readAt).not.toBeNull()
   
  })
})
