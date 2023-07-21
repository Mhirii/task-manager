import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { response } from 'express';
import { Task } from "../schemas/task.schema";

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.taskService.createTask(createTaskDto);
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

  @Get()
  async getAllTasks(@Res() res) {
    const tasks = await this.taskService.getAllTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/:id')
  async getTaskById(@Res() response, @Param('id') id: string) {
    try {
      const task = await this.taskService.getTaskById(id);
      return response.status(HttpStatus.OK).json(task);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }

  @Put('/:TaskID')
  async editTask(
    @Res() res,
    @Param('TaskID') taskID,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    let editedTask: Task;
    [editedTask] = await Promise.all([
      this.taskService.editTask(taskID, updateTaskDto),
    ]);
    return res.status(HttpStatus.OK).json({
      message: 'task updated',
      task: editedTask,
    });
  }

  @Delete('/:taskID')
  async deleteTask(@Res() res, @Param('taskID') taskID) {
    const deletedTask = await this.taskService.deleteTask(taskID);
    return res.status(HttpStatus.OK).json({
      message: 'task deleted',
      task: deletedTask,
    });
  }
}
