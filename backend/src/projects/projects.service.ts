import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>, // private userService: UserService,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = await new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async getUserProjects(username: string) {
    return await this.projectModel.find({ owner: username }).exec();
  }

  async getProjectById(projectId: string) {
    const project = await this.projectModel.findById(projectId).exec();
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
}
