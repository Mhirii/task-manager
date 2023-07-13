import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Put,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-Task.dto';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  @Get(':id')
  getTask(@Query('id') id: string) {
    const task = this.taskService.getTask(id);
    return task;
  }
  @Get()
  async getTasks(@Res() res) {
    const tasks = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }
  @Put('/edit')
  async editTask(
    @Res() res,
    @Query('id') taskID,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const editedTask = await this.taskService.editTask(taskID, createTaskDto);
    return res.status(HttpStatus.OK).json({
      message: 'task updated',
      task: editedTask,
    });
  }
  @Delete('/delete')
  async deleteTask(@Res() res, @Query('taskID') taskID) {
    const deletedTask = await this.taskService.deleteTask(taskID);
    return res.status(HttpStatus.OK).json({
      message: 'task deleted',
      task: deletedTask,
    });
  }
}
