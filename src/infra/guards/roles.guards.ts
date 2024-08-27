/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../user-enum/user.enum'
import { ROLES_KEY } from '../decorator/roles.decorator'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    // const { user } = context.switchToHttp().getRequest()
    const { authorization } = context.switchToHttp().getRequest().headers
    
    const loginPayload = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_PRIVATE_KEY,
      })
      .catch(() => undefined);
    console.log(loginPayload)
    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);

  }
}
