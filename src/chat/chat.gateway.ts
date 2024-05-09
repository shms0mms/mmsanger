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
import { Message } from '@prisma/client';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: METHODS,
    credentials: true,
  },
})
export class ChatGateway
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
  async handleMessage(
    client: Socket,
    message: Omit<Message, 'id' | 'companionId' | 'createdAt'>,
  ) {
    const object = JSON.parse(JSON.stringify(message));

    const { message: text, chatId, userId } = object;

    const msg = await this.chatService.createMessage({
      message: text,
      chatId,
      userId,
    });

    client.broadcast.emit('message', msg);
  }
}
