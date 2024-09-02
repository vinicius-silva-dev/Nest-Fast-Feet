/* eslint-disable prettier/prettier */
import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class ValidateRoles implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Passou aqui')
    next()
  }
}
