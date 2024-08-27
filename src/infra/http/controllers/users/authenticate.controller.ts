/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common'
import { AuthenticateUseCase } from 'src/domain/fast-feet/application/use-case/users/authenticate'
import { z } from 'zod'

const envSchema = z.object({
  cpf: z.string(),
  password: z.string()
})

type Auth = z.infer<typeof envSchema>

@Controller('/auth')
export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase
  ) {}

  @Post()
  async auth(@Body() body: Auth) {
    const { cpf, password } = body

    const result = await this.authenticateUseCase.execute({
      cpf,
      password
    })

    if (!result) {
      throw new Error('Fail authenticate')
    }

    console.log(result.token)
    return {
      acess_token: result.token
    }
    


  

  }
}
