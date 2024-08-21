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

    await Promise.all([
      await prisma.package.create({
        data: {
          name: 'Mouse sem fio',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient.id,
  
        }
      }),

      await prisma.package.create({
        data: {
          name: 'Monitor AOC 21,5 polegadas',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient.id,
  
        }
      }),

      await prisma.package.create({
        data: {
          name: 'PC Lenovo 8GB Ram',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient.id,
  
        }
      })
    ])

    const result = await request(app.getHttpServer()).get(`/package/${user1.id}`).send()
      

      expect(result.statusCode).toBe(200)
      expect(result.body).toHaveLength(3)
   
  })
})
