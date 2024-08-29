/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { DatabaseModule } from 'src/infra/database/database.module';

describe('Edit Package e2e', () => {
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

  test('[PUT] should be abble to edit package E2E', async () => {
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

    const package1 = await prisma.package.create({
      data: {
        name: 'Mouse sem fio',
        status: 'aguardando',
        userId: user.id.toString(),
        recipientId: recipient.id,
      }
    })

    await prisma.attachment.create({
        data: {
          title: 'img_capa.jpg',
          url: 'img_capa.jpg',
          userId: user.id.toString(),
          recipientId: recipient.id,
          packageId: package1.id
        }
      })
      
    const result = await request(app.getHttpServer()).put(`/package/${package1.id}`).send({
      userId: user.id.toString(),
      status: 'entregue'
    })

  
    expect(result.statusCode).toBe(204)

    // const packageOnDatabase = await prisma.package.findFirst({
    //   where: {
    //     status: 'retirado',
    //   }
    // })
    // console.log(packageOnDatabase)
    // expect(packageOnDatabase).toBeTruthy()
  })
})
