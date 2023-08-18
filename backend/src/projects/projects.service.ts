import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    public projectModel: Model<Project>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const newProject = new this.projectModel(createProjectDto);
      return newProject.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getUserProjects(username: string) {
    return await this.projectModel.find({ owner: username }).exec();
  }

  async getProjectById(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException(`project #${projectId} does not exist`);
    }
    return project;
  }

  editProject(projectId: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(projectId, updateProjectDto, {
      new: true,
    });
  }

  async deleteProject(projectID: string) {
    const project = await this.projectModel.findById(projectID);
    if (!project) {
      throw new NotFoundException(`project #${projectID} does not exist`);
    }
    return this.projectModel.findByIdAndRemove(projectID);
  }

  //   called in other services
  async findProjectsByIds(projectIds: string[]): Promise<Project[]> {
    return this.projectModel.find({ _id: { $in: projectIds } }).exec();
  }
}
