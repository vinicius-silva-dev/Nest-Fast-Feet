/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'

describe('Create User e2e', () => {
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

  test('[POST] should be abble to create user E2E', async () => {
    try {
      const result = await request(app.getHttpServer()).post('/user').send({
        name: 'Vinicius Silva',
        cpf: '03544587432',
        password: '123456',
        role: 'Admin'
      })
  
      expect(result.statusCode).toBe(201)
    } catch (error) {
      console.log(error)
    }
   

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        cpf: '03544587432'
      }
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
