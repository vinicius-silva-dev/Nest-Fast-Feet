/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { describe, test } from 'vitest'
import { AppModule } from 'src/app.module';
// import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserFactory } from 'test/factory/make-user';
// import { hash } from 'bcrypt';

describe('Fetch User e2e', () => {
  let app: INestApplication
  // let prisma: PrismaService
  let userFactory: UserFactory
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule],
        providers: [UserFactory]
      }).compile();
    
    app = moduleRef.createNestApplication()

    // prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
  
    await app.init()
  });

  test('[GET] should be abble to fetch user E2E', async () => {
    await Promise.all([
      userFactory.makePrismaUser({
        role: 'entregador'
      }),
      userFactory.makePrismaUser({
        role: 'admin'
      }),
      userFactory.makePrismaUser({
        role: 'entregador'
      })
    ])
 

    // const user = await prisma.user.create({
    //   data: {
    //     name: 'Vinicius Silva',
    //     cpf: '03544587432',
    //     password: await hash('123456', 8),
    //     role: 'Admin'
    //   }
    // })

    const result = await request(app.getHttpServer()).get(`/user/entregador`).send()
    

    expect(result.statusCode).toBe(200)

    // const userOnDatabase = await prisma.user.findFirst({
    //   where: {
    //     role: 'Admin'
    //   }
    // })

    // expect(userOnDatabase).toBeTruthy()
  })
})
