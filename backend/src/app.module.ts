import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://Mhiri:n0j7aDgpKnITzowv@cluster0.wojp5kg.mongodb.net/task-manager?retryWrites=true&w=majority',
      'mongodb://127.0.0.1:27017/task-manager',
    ),
    TasksModule,
    ProjectsModule,
    AuthModule,
    UserModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
