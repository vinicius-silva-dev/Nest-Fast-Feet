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

describe('Delete User e2e', () => {
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

  test('[Delete] should be abble to delete user E2E', async () => {
    const user = await userFactory.makePrismaUser()

    // const user = await prisma.user.create({
    //   data: {
    //     name: 'Vinicius Silva',
    //     cpf: '03544587432',
    //     password: await hash('123456', 8),
    //     role: 'Admin'
    //   }
    // })

    const userId = user.id.toString()

    const result = await request(app.getHttpServer()).delete(`/user/${userId}`).send()
    

    expect(result.statusCode).toBe(204)

    // const userOnDatabase = await prisma.user.findFirst({
    //   where: {
    //     role: 'Admin'
    //   }
    // })

    // expect(userOnDatabase).toBeFalsy()
  })
})
