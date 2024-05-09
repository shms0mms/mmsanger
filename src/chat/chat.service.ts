/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserIDInput } from 'src/auth/input/user.input';
import { Prisma, Message } from '@prisma/client';
@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async createChat(users: UserIDInput[]) {
    const oldChat = await this.prisma.chat.findFirst({
      where: {
        AND: [
          {
            users: {
              every: {
                id: {
                  in: users.map((u) => u.id),
                },
              },
            },
          },
        ],
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (oldChat?.id) return { ...oldChat };
    const userConnectIds = users.map((user) => ({ id: user.id }));
    const chat = await this.prisma.chat.create({
      data: {
        users: { connect: userConnectIds },
        messages: {
          connectOrCreate: [],
        },
      },
      include: {
        users: true,
      },
    });

    return { ...chat };
  }

  async getAllChats(searchTerm: string, userId: number) {
    const users = { some: { id: userId } };

    const searchTermFilter: Prisma.ChatWhereInput = searchTerm
      ? {
          OR: [
            {
              chatName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              users: {
                some: {
                  OR: [
                    {
                      firstName: {
                        contains: searchTerm,
                        mode: 'insensitive',
                      },
                    },
                    {
                      secondName: {
                        contains: searchTerm,
                        mode: 'insensitive',
                      },
                    },
                    {
                      username: {
                        contains: searchTerm,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              },
            },
          ],
          users,
        }
      : {
          users,
        };

    const chats = await this.prisma.chat.findMany({
      where: searchTermFilter,

      include: {
        users: true,
        messages: true,
      },
    });

    return chats;
  }
  async getLastMessagesByChatId(chatId: string) {
    const messages = await this.prisma.message.findMany({
      where: { chatId },
      include: {
        chat: true,
        user: true,
      },
    });

    return messages;
  }
  async removeChatById(chatId: string) {
    const oldChat = await this.prisma.chat.findUnique({
      where: { id: chatId },
    });
    if (!oldChat) throw new NotFoundException('Chat not found');
    await this.prisma.chat.delete({
      where: { id: chatId },
    });
    return { chatId };
  }

  async getChatByChatId(chatId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },

      include: {
        messages: {
          take: 10,
          include: {
            user: true,
          },
        },
        users: true,
      },
    });

    return chat;
  }

  async createMessage({
    message,
    userId,
    chatId,
  }: Omit<Message, 'id' | 'companionId' | 'createdAt'>) {
    return await this.prisma.message.create({
      data: {
        message,
        userId,
        chatId,
      },
      include: {
        user: true,
        chat: true,
      },
    });
  }
}
