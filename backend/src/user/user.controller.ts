import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch, Post,
  Put,
  Res
} from "@nestjs/common";
import { UserService } from './user.service';
import { Public } from '../common/decorators/public.decorator';
import { UpdateTaskDto } from '../tasks/dto/updateTask.dto';
import { Task } from '../schemas/task.schema';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserTasksProgressDto } from './dto/userTasksInProgress.dto';
import { UserTasksDoneDto } from './dto/userTasksDone.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Public()
  @Get('/:id')
  async getUserById(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }

  @Public()
  @Get('username/:username')
  async getUserByName(@Res() response, @Param('username') username: string) {
    try {
      const user = await this.userService.getUserByName(username);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }

  @Public()
  @Get(':username/tasksInProgress')
  async getTasksInProgress(
    @Param('username') username: string,
  ): Promise<UserTasksProgressDto> {
    return this.userService.getTasksInProgress(username);
  }

  @Public()
  @Delete(':username/tasksInProgress/:taskId')
  @HttpCode(204)
  async deleteTasksInProgress(
    @Param('username') username: string,
    @Param('taskId') taskId: string,
  ){
    return await this.userService.deleteTasksInProgress(username, taskId);
  }

  @Public()
  @Get(':username/tasksDone')
  async getTasksDone(
    @Param('username') username: string,
  ): Promise<UserTasksDoneDto> {
    return this.userService.getTasksDone(username);
  }

  @Public()
  @Delete(':username/tasksDone/:taskId')
  @HttpCode(204)
  async deleteTasksDone(
    @Param('username') username: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    await this.userService.deleteTasksDone(username, taskId);
  }

  @Public()
  @Patch(':username/moveTask/:taskId')
  async moveTask(
    @Param('username') username: string,
    @Param('taskId') taskId: string,
    @Body('from') from: string,
    @Body('to') to: string,
    //   { "from": "tasksInProgress", "to": "tasksDone" }
  ): Promise<User> {
    return this.userService.moveTask(username, taskId, from, to);
  }

  @Public()
  @Post('reorder/:username/:list/:taskId/:currentIndex/:targetIndex')
  async reorderTask(
    @Param('username') username: string,
    @Param('list') list: 'tasksInProgress' | 'tasksDone',
    @Param('taskId') taskId: string,
    @Param('currentIndex') currentIndex: number,
    @Param('targetIndex') targetIndex: number,
  ) {
    return this.userService.reorderTask(
      username,
      list,
      taskId,
      currentIndex,
      targetIndex,
    );
  }
}
