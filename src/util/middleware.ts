import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as User from 'src/users/entities/user'
import { verifyJwt } from './jwt'

export interface CustomRequest extends Request {
  ipAddr: string
}
export interface UserRequest extends CustomRequest {
  user: User.Entity
  // roles: string[]
}
@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: UserRequest, res: Response, next: NextFunction) {
    req.user = verifyJwt(req.headers['x-jwt'] as string)
    next()
  }
}

@Injectable()
export class UserOnlyMiddleware implements NestMiddleware {
  async use(req: UserRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      console.log('failed user middleware', req.method)
      throw new UnauthorizedException('unauthorized')
    }
    next()
  }
}

@Injectable()
export class NextClientMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers['x-client-ip']) {
      req.ipAddr = <string>req.headers['x-client-ip'] || req.clientIp
    }
    if (req.headers['x-client-ua']) {
      req.headers['user-agent'] = <string>req.headers['x-client-ua']
    }
    next()
  }
}
