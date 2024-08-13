/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'

describe('Create Recipient e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule]
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
  
    await app.init()
  });

  test('[POST] should be abble to create recipient E2E', async () => {
    try {
      const result = await request(app.getHttpServer()).post('/recipient').send({
        name: 'Vinicius Silva',
        rua: 'Ali Perto',
        numero: 2544,
        bairro: 'Luz',
        cidade: 'Jaru',
        estado: 'Rondônia',
        latitude: -10.4589548,
        longitude: -62.4639924
      })
  
      expect(result.statusCode).toBe(201)
    } catch (error) {
      console.log(error)
    }
   

    const recipientOnDatabase = await prisma.recipient.findFirst({
      where: {
        rua:'Ali Perto',
        numero: 2544
        
      }
    })

    expect(recipientOnDatabase).toBeTruthy()
  })
})
