import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';        widget.wallpaper(directory="~/Pictures/Wallpapers/"),

import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    //   isGlobal: true,
    // }),
    // MongooseModule.forRoot(process.env.db_uri),
    MongooseModule.forRoot(
      'mongodb+srv://Mhiri:n0j7aDgpKnITzowv@cluster0.wojp5kg.mongodb.net/task-manager?retryWrites=true&w=majority',
    ),
    TasksModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
