import { PrismaService } from './../prisma.service';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatResolver } from './chat.resolver';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { ChatsGateway } from './chats.gateway';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [
    ChatGateway,
    ChatService,
    PrismaService,
    ChatResolver,
    JwtService,
    ConfigService,
    AuthService,
    ChatsGateway,
    MailService,
  ],
})
export class ChatModule {}
