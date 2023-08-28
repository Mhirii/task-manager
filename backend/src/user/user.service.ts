import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
// import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ProjectsService } from '../projects/projects.service';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../schemas/task.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly projectService: ProjectsService,
    private tasksService: TasksService,
  ) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id); //.exec();
    if (!user) {
      throw new NotFoundException(`user #${id} does not exist`);
    }
    return user;
  }

  async getNameFromId(id: string): Promise<string | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`user #${id} does not exist`);
    }
    return user.username;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find(); //.exec();
    if (users.length === 0) {
      throw new NotFoundException(`no users found`);
    }
    return users;
  }

  async getUserByName(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException(`user #${username} does not exist`);
    }
    return user;
  }

  // async findUserByAccessToken(accessToken: string): Promise<User | null> {
  //   try {
  //     const { id } = this.jwtService.verify<{ id: string }>(accessToken);
  //     const user = await this.getUserById(id);
  //     return user;
  //   } catch (error) {
  //     console.log('jwt error');
  //     return null;
  //   }
  // }

  async addProgTaskToUser(username, createTaskDto) {
    const newTask = await this.tasksService.createTask(createTaskDto);
    const newTaskId = newTask._id.toString();
    this.userModel.updateOne(
      { username: username },
      { $push: { tasksInProgress: newTaskId } },
    );
    return newTask;
  }

  async removeProgTaskFromUser(username, taskId) {
    return this.userModel.updateOne(
      { username: username },
      { $pull: { tasksInProgress: taskId } },
    );
  }

  async getTasksInProgress(username: string) {
    const aggregationPipeline = [
      {
        $match: { username },
      },
      {
        $match: { tasksInProgress: { $type: 'array' } },
      },
      {
        $unwind: { path: '$tasksInProgress', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'tasksInProgress',
          foreignField: '_id',
          as: 'tasksInProgress',
        },
      },
      {
        $addFields: {
          tasksInProgress: {
            $cond: {
              if: { $isArray: '$tasksInProgress' },
              then: { $arrayElemAt: ['$tasksInProgress', 0] },
              else: null,
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          tasksInProgress: { $push: '$tasksInProgress' },
        },
      },
      {
        $project: {
          _id: 0,
          tasksInProgress: 1,
        },
      },
    ];
    const result = await this.userModel.aggregate(aggregationPipeline);
    return result[0];
  }

  async deleteTasksInProgress(username: string, taskId: string) {
    const deletedTask = await this.tasksService.deleteTask(taskId);
    this.userModel.findOneAndUpdate(
      { username },
      { $pull: { tasksInProgress: taskId } },
      { new: true },
    );
    return deletedTask;
  }

  async getTasksDone(username: string) {
    const aggregationPipeline = [
      {
        $match: { username },
      },
      {
        $match: { tasksDone: { $type: 'array' } }, // Filter out documents where tasksInProgress is not an array
      },
      {
        $unwind: { path: '$tasksDone', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'tasksDone',
          foreignField: '_id',
          as: 'tasksDone',
        },
      },
      {
        $addFields: {
          tasksDone: {
            $cond: {
              if: { $isArray: '$tasksDone' },
              then: { $arrayElemAt: ['$tasksDone', 0] },
              else: null,
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          tasksDone: { $push: '$tasksDone' },
        },
      },
      {
        $project: {
          _id: 0,
          tasksDone: 1,
        },
      },
    ];
    const result = await this.userModel.aggregate(aggregationPipeline);
    return result[0];
  }

  async deleteTasksDone(username: string, taskId: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { username },
      { $pull: { tasksDone: taskId } },
      { new: true },
    );
  }

  async moveTask(
    username: string,
    taskId: string,
    from: string,
    to: string,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { username },
      { $pull: { [from]: taskId }, $addToSet: { [to]: taskId } },
      { new: true },
    );
  }

  async reorderTask(
    username: string,
    list: 'tasksInProgress' | 'tasksDone',
    taskId: string,
    currentIndex: number,
    targetIndex: number,
  ) {
    const user = await this.userModel.findOne({ username });
    const targetArray =
      list === 'tasksInProgress' ? user.tasksInProgress : user.tasksDone;
    const movedTask = targetArray[currentIndex];
    if (!movedTask) {
      throw new Error(
        `Failed to move ${taskId} from ${currentIndex} to ${targetIndex} in ${username}'s ${list} Either Task does not exist at the current index.`,
      );
    }

    targetArray.splice(currentIndex, 1);
    targetArray.splice(targetIndex, 0, movedTask);
    await user.save();

    return movedTask;
  }

  async getProjects(username: string) {
    const user = await this.userModel.findOne({ username }); //.exec();
    if (!user) {
      throw new NotFoundException(`user #${username} does not exist`);
    }
    const projects = await this.projectService.findProjectsByIds(user.projects);
    return projects;
  }

  async addProjectToUser(username: string, newProjectId: any) {
    return this.userModel.updateOne(
      { username: username },
      { $push: { projects: newProjectId } },
    );
  }

  async removeProjectFromUser(username: string, _id: string) {
    return this.userModel.updateOne(
      { username: username },
      { $pull: { projects: _id } },
    );
  }
}
