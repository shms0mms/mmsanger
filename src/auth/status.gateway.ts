/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { METHODS } from 'src/constants/methods.constants';
import { EnumStatus } from './entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_NAME } from 'src/constants/auth.constants';
export interface Status {
  userId: number;
  status: EnumStatus;
}

@WebSocketGateway({
  namespace: 'status',
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: METHODS,
    credentials: true,
  },
})
export class StatusGateway implements OnGatewayInit {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {}

  handleConnection(client: Socket) {}

  async handleDisconnect(client: Socket) {
    if (client.handshake.auth) {
      try {
        const accessToken = client.handshake.auth[ACCESS_TOKEN_NAME];
        if (!accessToken)
          throw new UnauthorizedException('User not authorized');
        const { _id: id } = await this.jwt.verifyAsync(accessToken);
        await this.authService.toggleStatus(+id, EnumStatus.offline);
        client.broadcast.emit('status', {
          userId: id,
          status: EnumStatus.offline,
        });
      } catch (err) {
        // throw new UnauthorizedException('User not authorized');
      }
    }
  }

  @SubscribeMessage('status')
  async handleMessage(client: Socket, message: Status) {
    const msg = JSON.parse(JSON.stringify(message));
    const { status, userId } = msg;
    await this.authService.toggleStatus(userId, status);
    client.broadcast.emit('status', msg);
  }
}
