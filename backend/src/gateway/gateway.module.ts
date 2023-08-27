import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.Gateway';

@Module({
  providers: [SocketGateway],
})
export class GatewayModule {}
