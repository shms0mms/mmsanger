/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}
  async addUserToHistory(
    currentUserId: number,
    historyId: number,
    userId: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      include: {
        histories: true,
        history: true,
      },
    });

    const { histories, id, historyId: _, history: __, ..._user } = user;
    // console.log(user);

    const history = await this.prisma.history.update({
      where: {
        id: historyId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return history;
  }

  async removeUserFromHistory(
    currentUserId: number,
    historyId: number,
    userId: number,
  ) {
    return await this.prisma.history.update({
      where: {
        userId: currentUserId,
        id: historyId,
      },
      data: {
        users: {
          delete: {
            id: userId,
          },
        },
      },
    });
  }
  async getHistory(userId: number) {
    return await this.prisma.history.findFirst({
      where: {
        userId,
      },
      include: {
        users: true,
      },
    });
  }
  async clean(currentUserId: number, historyId: number) {
    return await this.prisma.history.update({
      where: {
        userId: currentUserId,
        id: historyId,
      },
      data: {
        users: { set: [] },
      },
      include: {
        users: true,
      },
    });
  }
}
