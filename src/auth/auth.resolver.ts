import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, UserAuth, UserDB, UserTokens } from './entities/user.entity';
import { CurrentUser } from './decorators/user.decorator';
import { UserCreateInput, UserLoginInput } from './input/user.input';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserDB)
  async getCurrentUser(@CurrentUser() user) {
    return user;
  }

  @Mutation(() => UserAuth)
  async register(@Args('user') user: UserCreateInput) {
    return await this.authService.register(user);
  }

  @Mutation(() => UserAuth)
  async login(@Args('user') user: UserLoginInput) {
    return await this.authService.login(user);
  }

  @Mutation(() => User)
  async auth(@Context() context) {
    const accessToken = context.req.headers['accessToken'];

    return await this.authService.auth(accessToken);
  }

  @Mutation(() => UserTokens)
  async getNewTokens(@Context() context) {
    const refreshToken = context.req.cookies['refreshToken'];

    return await this.authService.getNewTokens(refreshToken);
  }
  @Mutation(() => UserTokens)
  async confirmEmail(@Args('userId') userId: number) {
    return await this.authService.confirmEmail(+userId);
  }
}
