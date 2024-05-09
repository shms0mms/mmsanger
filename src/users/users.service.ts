import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDB } from 'src/auth/entities/user.entity';
import { UserUpdateInput } from 'src/auth/input/user.input';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}
  async getAll({
    currentPage,
    searchTerm,
  }: {
    currentPage: number;
    searchTerm: string;
  }) {
    const { skip } = this.pagination.getPagination({
      currentPage,
      take: 10,
    });

    const searchTermFilter: Prisma.UserWhereInput = searchTerm
      ? {
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
        }
      : {};
    const _users = await this.prisma.user.findMany({
      where: searchTermFilter,
    });
    const users = await this.prisma.user.findMany({
      take: 10,
      skip: searchTerm ? 0 : skip,
      where: searchTermFilter,
    });

    return { users, usersLength: _users.length };
  }

  async getById(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  async removeAll() {
    await this.prisma.user.deleteMany();
    return true;
  }
  async uploadImage(user: UserDB, imageURL: string) {
    //FileUpload
    // const { createReadStream, filename } = await imageURL;
    // const path = `./upload/${filename}`;
    // const stream = createReadStream();

    // await new Promise((resolve, reject) =>
    //   stream
    //     .pipe(createWriteStream(path))
    //     .on('finish', resolve)
    //     .on('error', reject),
    // );

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        imageURL,
      },
    });
    return { imageURL };
  }
  async updateUser(user: UserDB, newUser: UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...newUser,
      },
    });
  }
  async updateDescription(user: UserDB, description: string) {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        description,
      },
    });
  }
}
