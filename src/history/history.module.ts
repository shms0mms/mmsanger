import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    HistoryResolver,
    HistoryService,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class HistoryModule {}
