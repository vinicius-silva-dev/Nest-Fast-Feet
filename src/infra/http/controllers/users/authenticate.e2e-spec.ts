/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { hash } from 'bcrypt';


describe('[POST] Authenticate E2E', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
  
    await app.init()
  });

  test('should be abble to authenticate user', async () => {
    await prisma.user.create({
      data: {
        name: 'Vinicius Silva',
        cpf: '03544587432',
        password: await hash('123456', 8),
        role: 'Admin'
      }
    })
    const result = await request(app.getHttpServer()).post('/auth').send({
      cpf: '03544587432',
      password: '123456',
    })

    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual({
      acess_token: expect.any(String)
    })
  })
})
