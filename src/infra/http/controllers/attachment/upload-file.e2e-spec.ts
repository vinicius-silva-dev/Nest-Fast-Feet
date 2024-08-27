/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';


describe('Read Notification e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule],
        providers: [UserFactory]
      }).compile();
    
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    await app.init()
  });

  test('[POST] should be abble to upload file E2E', async () => {
    const user = await userFactory.makePrismaUser()

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

    const result = await request(app.getHttpServer()).post(`/attachment/${user.id}/${recipient.id}`).attach('file',
    './test/img/exemple_img.jpeg'
    )

    console.log(result.body)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual(
      expect.objectContaining({
        attachmentId: expect.any(String)
      })
    )
  })
})
