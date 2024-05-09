/* eslint-disable @typescript-eslint/no-unused-vars */
// socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthService } from 'src/auth/auth.service';
import { METHODS } from 'src/constants/methods.constants';
import { UserIDInput } from 'src/auth/input/user.input';

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: METHODS,
    credentials: true,
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {}

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('message')
  async handleMessage(client: Socket, users: UserIDInput[]) {
    const _users = JSON.parse(JSON.stringify(users));

    const chat = await this.chatService.createChat(_users);

    client.broadcast.emit('message', chat);
  }
}
