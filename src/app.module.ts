import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma.service';
import { HistoryModule } from './history/history.module';
import { PaginationModule } from './pagination/pagination.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({
        req,
        res,
        prismaService: PrismaService,
      }),

      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    HistoryModule,
    PaginationModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
