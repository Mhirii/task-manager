import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(Project.name)
    public projectModel: Model<Project>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await new this.taskModel(createTaskDto);
    // const res = this.userService.addProgTaskToUser(newTask.owner, newTask._id);
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
    return this.taskModel.findByIdAndUpdate(taskID, updateTaskDto, {
      new: true,
    });
  }

  async deleteTask(taskID): Promise<any> {
    const task = await this.taskModel.findById(taskID);
    if (!task) {
      throw new NotFoundException(`task #${taskID} does not exist`);
    }
    // const res = this.userService.removeProgTaskFromUser(task.owner, task._id);
    return this.taskModel.findByIdAndRemove(taskID);
  }

  async getTasksByProject(project_id: string) {
    try {
      const project = await this.projectModel.findById(project_id);
      if (!project) {
        throw new NotFoundException(`project ${project_id} does not exits`);
      }
      const tasksList = project.tasks;

      const tasks = [];
      for (const id of tasksList) {
        const task = await this.getTaskById(id);
        tasks.push(task);
      }
      return tasks;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
