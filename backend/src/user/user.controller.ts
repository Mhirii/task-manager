import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../schemas/user.schema';
import { UserTasksProgressDto } from './dto/userTasksInProgress.dto';
import { UserTasksDoneDto } from './dto/userTasksDone.dto';
import { CreateProjectDto } from '../projects/dto/createProject.dto';
import { Project } from '../schemas/project.schema';
import { ProjectsService } from '../projects/projects.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private projectsService: ProjectsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Public()
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

  // Tasks
  @Public()
  @Get(':username/tasksInProgress')
  async getTasksInProgress(
    @Param('username') username: string,
  ): Promise<UserTasksProgressDto> {
    return this.userService.getTasksInProgress(username);
  }

  @Public()
  @Post(':username/tasksInProgress')
  async addProgTaskToUser(
    @Param('username') username: string,
    @Res() response,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      const newTask = await this.userService.addProgTaskToUser(
        username,
        createTaskDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Task has been created successfully',
        newTask,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Task not created!',
        error: 'Bad Request',
      });
    }
  }

  @Public()
  @Delete(':username/tasksInProgress/:taskId')
  @HttpCode(204)
  async deleteTasksInProgress(
    @Param('username') username: string,
    @Param('taskId') taskId: string,
    @Res() response,
  ) {
    try {
      const deletedTask = await this.userService.deleteTasksInProgress(
        username,
        taskId,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Task has been deleted successfully',
        deletedTask,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Task could not be deleted!',
        error: 'Bad Request',
      });
    }
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

  // Projects

  @Public()
  @Get(':username/projects')
  async getProjects(@Param('username') username: string) {
    return this.userService.getProjects(username);
  }

  @Public()
  @Post(':username/projects')
  async createProject(
    @Res() response: any,
    @Param('username') username: string,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<
    | { message: string; project: Project }
    | { statusCode: number; message: string; error: string }
  > {
    try {
      const newProject = await this.projectsService.createProject(
        createProjectDto,
      );
      const res = this.userService.addProjectToUser(
        newProject.owner,
        newProject._id,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Project has been created successfully',
        newProject,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Project not created!',
        error: 'Bad Request',
      });
    }
  }

  @Public()
  @Delete(':username/projects/:projectId')
  @HttpCode(204)
  async deleteProject(
    @Res() response: any,
    @Param('username') username: string,
    @Param('projectId') projectId: string,
  ): Promise<
    | { message: string; project: Project }
    | { statusCode: number; message: string; error: string }
  > {
    try {
      const deletedProject = await this.projectsService.deleteProject(
        projectId,
      );
      const res = await this.userService.removeProjectFromUser(
        username,
        projectId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Project has been deleted successfully',
        deletedProject,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: process of deleting project has failed successfully!',
        error: 'Bad Request',
      });
    }
  }
}
