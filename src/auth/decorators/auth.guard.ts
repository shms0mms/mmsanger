import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    try {
      const ctx = GqlExecutionContext.create(context);

      const accessToken = ctx.getContext().req.cookies['accessToken'];

      this.jwt.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (!accessToken) {
        throw new UnauthorizedException('Not authenticated');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Not authenticated');
    }
  }
}
