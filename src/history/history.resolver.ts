import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}
  @Auth()
  @Mutation(() => History)
  async addUserToHistory(@CurrentUser() user, @Args('userId') userId: number) {
    return await this.historyService.addUserToHistory(
      user.id,
      user.historyId,
      userId,
    );
  }
  @Auth()
  @Mutation(() => History)
  async removeUserFromHistory(
    @CurrentUser() user,
    @Args('userId') userId: number,
  ) {
    return await this.historyService.removeUserFromHistory(
      user.id,
      user.historyId,
      userId,
    );
  }
  @Auth()
  @Query(() => History)
  async getHistory(@CurrentUser() user) {
    return await this.historyService.getHistory(user.id);
  }
  @Auth()
  @Mutation(() => History)
  async clean(@CurrentUser() user) {
    return await this.historyService.clean(user.id, user.historyId);
  }
}
