import { UnauthorizedException } from '@nestjs/common';

export const isBearerToken = (token: string) => {
  if (!token || !token.includes('Bearer'))
    throw new UnauthorizedException('Token is not a valid');
};
