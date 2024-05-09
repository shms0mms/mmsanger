import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Chat } from './entities/chat.entity';
import { Delete } from './entities/delete.entity';
import { UserIDInput } from 'src/auth/input/user.input';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Auth()
  @Query(() => [Message])
  async getLastMessagesByChatId(@Args('chatId') chatId: string) {
    return await this.chatService.getLastMessagesByChatId(chatId);
  }

  @Auth()
  @Query(() => Chat)
  async getChatByChatId(@Args('chatId') chatId: string) {
    const chat = await this.chatService.getChatByChatId(chatId);

    return chat;
  }

  @Auth()
  @Query(() => [Chat])
  async getAllChats(
    @Args('searchTerm') searchTerm: string,
    @CurrentUser() user,
  ) {
    return await this.chatService.getAllChats(searchTerm, user.id);
  }

  @Auth()
  @Mutation(() => Chat)
  async createChat(
    @Args('users', { type: () => [UserIDInput] }) users: UserIDInput[],
  ) {
    return await this.chatService.createChat(
      users.map((c) => ({ ...c, id: +c.id })),
    );
  }

  @Auth()
  @Mutation(() => Delete)
  async removeChatById(@Args('chatId') chatId: string) {
    return await this.chatService.removeChatById(chatId);
  }
}
