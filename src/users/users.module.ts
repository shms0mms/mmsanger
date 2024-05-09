import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaginationService } from 'src/pagination/pagination.service';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    PrismaService,
    JwtService,
    ConfigService,
    PaginationService,
    AuthService,
    MailService,
  ],
})
export class UsersModule {}
