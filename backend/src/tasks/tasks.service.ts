import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-Task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createTaskDto;
  }

  getTask(id): Promise<Task> {
    const task = this.taskModel.findById(id).exec();
    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  async editTask(taskID, createTaskDto: CreateTaskDto): Promise<Task> {
    const editedTask = await this.taskModel.findByIdAndUpdate(
      taskID,
      createTaskDto,
      { new: true },
    );
    return editedTask;
  }
  async deleteTask(taskID): Promise<any> {
    const deletedTask = await this.taskModel.findByIdAndRemove(taskID);
    return deletedTask;
  }
}
