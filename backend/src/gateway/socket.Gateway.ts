import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body: any) {
    // console.log(body);
    this.server.emit('onMessage', {
      msg: 'new Mouse Movement',
      content: body,
    });
  }

  @SubscribeMessage('activity')
  onNewActivity(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'new activity',
      content: body,
    });
  }
}
