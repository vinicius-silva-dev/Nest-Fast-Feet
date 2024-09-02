/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
// import jwt from 'jsonwebtoken'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'


@Injectable()
export class RoleAdmin implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor')
    // const [req] = context.getArgs()
    
    // const secret = 'your_secret_key'
    
    // const token = req.headers.authorization.split(' ')[1]
  
    
    
    // jwt.verify(token, secret, (err, user) => {
    //   if(err) {
    //     throw new Error('Token invalido')
    //   }

    //   console.log(user)
    // })
    // console.log('token ',token)

    const now = Date.now()
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)))
  }
}
