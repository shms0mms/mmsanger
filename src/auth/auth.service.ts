/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_EXPIRE,
} from 'src/constants/auth.constants';
import { hash, verify } from 'argon2';

import { EnumStatus } from './entities/user.entity';
import { UserCreateInput, UserLoginInput } from './input/user.input';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mailService: MailService,
  ) {}
  async getCurrentUser(req: Request) {
    try {
      const accessToken = req.cookies['accessToken'].replace(
        `Bearer `,
        '',
      ) as string;

      if (!accessToken) {
        throw new NotFoundException('Token is not a found');
      }
      const { _id: id } = await this.jwt.verify(accessToken);
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      const { password, ...currentUser } = user;
      return { ...currentUser };
    } catch (error) {
      throw new UnauthorizedException('User is not authorized');
    }
  }

  async register(user: UserCreateInput) {
    const { email, username } = user;
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });

    if (oldUser) throw new UnauthorizedException('User is already exists');

    const password = await hash(user.password);

    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        password,
      },
    });
    const history = await this.prisma.history.create({
      data: {
        user: {
          connect: { id: createdUser.id },
        },
      },
    });
    await this.prisma.user.update({
      where: {
        id: createdUser.id,
      },
      data: { historyId: history.id },
    });
    await this.mailService.sendEmail(
      user.email,
      'Подтвердите пожалуйста вашу почту для входа в аккаунт!',
      `Перейдите по ссылке и подтвердите почту: ${process.env.CLIENT_URL}/auth/confirm/${createdUser.id}`,
    );
    const tokens = await this.issueTokens(createdUser.id);

    return { ...createdUser, ...tokens };
  }

  async login(user: UserLoginInput) {
    const { password, email, username } = user;
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });

    if (!oldUser) throw new NotFoundException('User is not a found');

    if (await verify(oldUser.password, password)) {
      const tokens = await this.issueTokens(oldUser.id);
      return { ...tokens, ...oldUser };
    } else {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }
  async auth(accessToken: string) {
    try {
      const { _id: id } = await this.jwt.verify(accessToken);
      return await this.getUserById(id);
    } catch (err) {
      throw new UnauthorizedException('Token is not a valid');
    }
  }
  async toggleStatus(userId: number, status: EnumStatus) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        status,
      },
    });
  }
  async confirmEmail(userId: number) {
    const oldUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!oldUser) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        emailConfirmed: true,
      },
    });

    return await this.issueTokens(userId);
  }
  async getNewTokens(refreshToken: string) {
    try {
      const { _id: id } = await this.jwt.verify(refreshToken);
      return await this.issueTokens(id);
    } catch (err) {
      throw new UnauthorizedException('Token is not a valid');
    }
  }
  async issueTokens(id: number) {
    const payload = { _id: id };
    const accessToken = await this.jwt.sign(payload, {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    });
    const refreshToken = await this.jwt.sign(payload, {
      expiresIn: REFRESH_TOKEN_EXPIRE,
    });
    return { accessToken, refreshToken };
  }
  async getUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
  async addAccessTokenToCookies(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + parseInt(ACCESS_TOKEN_EXPIRE));

    res.cookie(ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }
  async removeAccessTokenFromCookies(res: Response) {
    res.cookie(ACCESS_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
