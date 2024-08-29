/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { DatabaseModule } from 'src/infra/database/database.module';

describe('Get Package e2e', () => {
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

  test('[GET] should be abble to get package E2E', async () => {
   
    const user1 = await userFactory.makePrismaUser()

    // const user2 = await userFactory.makePrismaUser()

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

    const _package = await prisma.package.create({
        data: {
          name: 'Mouse sem fio',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient.id,
        }
      })

    await prisma.attachment.create({
      data: {
        title: 'img_capa.jpg',
        url: 'img_capa.jpg',
        userId: user1.id.toString(),
        recipientId: recipient.id,
        packageId: _package.id
      }
    })

    const result = await request(app.getHttpServer()).get(`/attachment/${_package.id}`).send()
      
    console.log(result.body)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          title: 'img_capa.jpg',
        })
      })
    )

    const attachmentOnDatabase = await prisma.attachment.findFirst({
      where: {
        title: 'img_capa.jpg',
      }
    })
    console.log(attachmentOnDatabase)
    expect(attachmentOnDatabase).toBeTruthy()
  })
})
