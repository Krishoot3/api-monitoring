import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthService implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (process.env.API_KEY === req.query.apiKey) {
      return next();
    }
    throw new UnauthorizedException();
  }
  // async validateApiKey(apiKey: string): Promise<boolean | Error> {
  //   if (process.env.API_KEY === apiKey) {
  //     return true;
  //   }
  //   throw new UnauthorizedException();
  // }
}
