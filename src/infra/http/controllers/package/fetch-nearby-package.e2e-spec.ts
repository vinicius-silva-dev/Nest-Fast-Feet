/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { UserFactory } from 'test/factory/make-user';
import { DatabaseModule } from 'src/infra/database/database.module';
// import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinats';

describe('Fetch nearby Package e2e', () => {
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

  test('[GET] should be abble to fetch nearby package E2E', async () => {
   
    const user1 = await userFactory.makePrismaUser()

    // const user2 = await userFactory.makePrismaUser()

    const recipient1 = await prisma.recipient.create({
      data: {
        name: 'Vinicius Silva',
        rua: 'Ali Perto',
        numero: 2544,
        bairro: 'Luz',
        cidade: 'Jaru',
        estado: 'Rondônia',
        latitude: -10.4077009,
        longitude: -62.5159118
      }
        
    })

    const recipient2 = await prisma.recipient.create({
      data: {
        name: 'Joana Silva',
        rua: 'Ali Perto',
        numero: 2244,
        bairro: 'Luz',
        cidade: 'Jaru',
        estado: 'Rondônia',
        latitude: -10.4596426,
        longitude: -62.4602557
      }
        
    })
    // -10.4077009,-62.5159118
    await Promise.all([
      await prisma.package.create({
        data: {
          name: 'Mouse sem fio',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient1.id,
  
        }
      }),

      await prisma.package.create({
        data: {
          name: 'Monitor AOC 21,5 polegadas',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient2.id,
  
        }
      }),

      await prisma.package.create({
        data: {
          name: 'PC Lenovo 8GB Ram',
          status: 'aguardando',
          userId: user1.id.toString(),
          recipientId: recipient1.id,
        }
      })
    ])
    // const distance = getDistanceBetweenCoordinates(
    //   {latitude: -10.4595456, longitude: -62.4590848},
    //   {latitude: +recipient1.latitude, longitude: +recipient1.longitude}

    // )
    // console.log(distance)
    // -10.459885, -62.456822
    const result = await request(app.getHttpServer()).get(`/package/${-10.459885}/${-62.456822}`)
    // .query({
    //   latitude: -10.4595456,
    //   longitude: -62.4590848,
    // })
      
      // console.log(result.body)
      expect(result.statusCode).toBe(200)
      expect(result.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Monitor AOC 21,5 polegadas',
          })
        ])
      )
   
  })
})
