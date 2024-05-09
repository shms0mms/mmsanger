import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  User,
  UserDB,
  UserImage,
  UserUpdate,
} from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Users } from './entities/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserUpdateInput } from 'src/auth/input/user.input';
// import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Auth()
  @Mutation(() => User)
  async getById(userId: string) {
    return await this.usersService.getById(+userId);
  }
  @Mutation(() => UserDB)
  async updateDescription(
    @CurrentUser() user,
    @Args('description') description: string,
  ) {
    return await this.usersService.updateDescription(user, description);
  }
  @Mutation(() => UserUpdate)
  async updateUser(
    @CurrentUser() currentUser,
    @Args('user') user: UserUpdateInput,
  ) {
    return await this.usersService.updateUser(currentUser, user);
  }

  @Auth()
  @Query(() => UserDB)
  async getUserById(@Args('userId') userId: string) {
    return await this.usersService.getById(+userId);
  }
  @Mutation(() => UserImage)
  // @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @CurrentUser() user,
    @Args('imageURL') // { type: () => GraphQLUpload }
    imageURL: string, //FileUpload @UploadedFile()
  ) {
    return await this.usersService.uploadImage(user, imageURL);
  }
  @Query(() => Boolean)
  async removeAll() {
    return await this.usersService.removeAll();
  }
  @Auth()
  @Query(() => Users)
  async getAll(
    @Args('searchTerm') searchTerm: string,
    @Args('currentPage') currentPage: number,
  ) {
    const query = { searchTerm, currentPage };
    const { users, usersLength } = await this.usersService.getAll(query);
    return { users, currentPage, quantity: usersLength };
  }
}
