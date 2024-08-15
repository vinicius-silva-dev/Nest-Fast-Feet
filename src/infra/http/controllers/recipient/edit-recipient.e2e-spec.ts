/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { DatabaseModule } from 'src/infra/database/database.module';
import { RecipientFactory } from 'test/factory/make-recipient';
// import { hash } from 'bcrypt';

describe('Edit Recipient e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  // let recipientFactory: RecipientFactory
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule],
        providers: [RecipientFactory]
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    // recipientFactory = moduleRef.get(RecipientFactory)
  
    await app.init()
  });

  test('[PUT] should be abble to edit recipient E2E', async () => {
    // const recipient = await recipientFactory.makePrismaRecipient()

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

    const recipientId = recipient.id
    console.log(recipient)
    const result = await request(app.getHttpServer()).put(`/recipient/${recipientId}`).send({
      rua: 'Frei Caneca',
      numero: 1988,
      bairro: 'Jardim Esperança',
      cidade: recipient.cidade,
      estado: recipient.estado,
      latitude: -10.4589549,
      longitude: -62.4639925
    })
    

    expect(result.statusCode).toBe(204)

    // const recipientOnDatabase = await prisma.recipient.findFirst({
    //   where: {
    //     role: 'Admin'
    //   }
    // })

    // expect(recipientOnDatabase).toBeTruthy()
  })
})
