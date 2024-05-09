import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
export const CurrentUser = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    try {
      const context = GqlExecutionContext.create(ctx);
      if (context.getContext()) {
        const accessToken = context.getContext().req.cookies['accessToken'];

        if (!accessToken) {
          throw new UnauthorizedException('Token is not a valid');
        }

        const { _id: id } = jwt.verify(
          accessToken.replace('Bearer ', ''),
          process.env.JWT_SECRET,
        );

        const Prisma = context.getContext().prismaService;
        const prisma = new Prisma();

        const user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        return user;
      } else {
        return {};
      }
    } catch (err) {
      throw new UnauthorizedException('User not authorized');
    }
  },
);
