import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from '../schemas/project.schema';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Public()
  @Post()
  async createProject(
    @Res() response: any,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<
    | { message: string; project: Project }
    | { statusCode: number; message: string; error: string }
  > {
    try {
      const newProject = await this.projectsService.createProject(
        createProjectDto,
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
  @Get('/user/:user')
  async getUserProjects(@Res() res, @Param('user') username: string) {
    const projects = await this.projectsService.getUserProjects(username);
    return res.status(HttpStatus.OK).json(projects);
  }

  @Public()
  @Get('/:projectId')
  async getProjectById(@Res() response, @Param('projectId') projectId: string) {
    try {
      const project = await this.projectsService.getProjectById(projectId);
      return response.status(HttpStatus.OK).json(project);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }

  @Public()
  @Put('/:projectId')
  async editProject(
    @Res() res,
    @Param('projectId') projectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const editedProject = await Promise.all([
      this.projectsService.editProject(projectId, updateProjectDto),
    ]);
    return res.status(HttpStatus.OK).json({
      message: 'Project Updated',
      project: editedProject,
    });
  }

  @Public()
  @Delete('/:projectID')
  async deleteProject(@Res() res, @Param('projectID') projectID) {
    const deletedProject = await this.projectsService.deleteProject(projectID);
    return res.status(HttpStatus.OK).json({
      message: 'project deleted',
      project: deletedProject,
    });
  }

  @Public()
  @Put('/:projectId/add/:taskId')
  async addTaskToProject(
    @Res() res,
    @Param('projectId') projectId,
    @Param('taskId') taskId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const editedProject = await Promise.all([
      this.projectsService.addTaskToProject(projectId, taskId),
    ]);
    return res.status(HttpStatus.OK).json({
      message: 'Task added to Project Successfully',
      project: editedProject,
    });
  }

  @Public()
  @Put('/:projectId/remove/:taskId')
  async removeTaskFromProject(
    @Res() res,
    @Param('projectId') projectId,
    @Param('taskId') taskId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const editedProject = await Promise.all([
      this.projectsService.removeTaskFromProject(projectId, taskId),
    ]);
    return res.status(HttpStatus.OK).json({
      message: 'Task removed from Project Successfully',
      project: editedProject,
    });
  }
}
