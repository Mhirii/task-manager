import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    private userService: UserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await new this.taskModel(createTaskDto);
    // TODO: save the task id in user's array
    const res = this.userService.addProgTaskToUser(newTask.owner, newTask._id);
    return newTask.save();
  }

  async getTaskById(taskId: string) {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException(`task #${taskId} does not exist`);
    }
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getUserTasks(username): Promise<Task[]> {
    return await this.taskModel.find({ owner: username }).exec();
  }

  async editTask(taskID, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // TODO: if its a check operation then move from user array to another accordingly
    return this.taskModel.findByIdAndUpdate(taskID, updateTaskDto, {
      new: true,
    });
  }

  async deleteTask(taskID): Promise<any> {
    //return this.taskModel.findByIdAndRemove(taskID);
    // TODO: remove from user's array
    const task = await this.taskModel.findById(taskID);
    if (!task) {
      throw new NotFoundException(`task #${taskID} does not exist`);
    }
    const res = this.userService.removeProgTaskFromUser(task.owner, task._id);
    return this.taskModel.findByIdAndRemove(taskID);
  }
  
  
}
