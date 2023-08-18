import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Project } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/createProject.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService', () => {
  let projectService: ProjectsService;
  let projectModel: Model<Project>;
  let userModel: Model<User>;

  const mockProjectService = {
    findById: jest.fn(),
  };

  const mockProject = {
    _id: '64d8dc12da44ca3278973c87',
    owner: 'Testing1',
    title: 'something',
    color: 'purple',
    tasks: [],
    dateAdded: '2023-08-13T13:35:14.915Z',
    updatedAt: '2023-08-13T13:35:14.915Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(Project.name),
          useValue: mockProjectService,
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    projectService = module.get<ProjectsService>(ProjectsService);
    projectModel = module.get<Model<Project>>(getModelToken(Project.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  it('should create a new project', async () => {
    const createProjectDto: CreateProjectDto = {
      owner: 'Testing1',
      title: 'Mock Project',
      color: 'cyan',
      tasks: [],
      dateAdded: new Date('2023-08-18T06:21:58.536Z'),
      updatedAt: new Date('2023-08-18T06:21:58.536Z'),
    };
    const mockCreatedProject = {
      _id: 'mockId',
      owner: 'Testing1',
      title: 'Mock Project',
      color: 'cyan',
      tasks: [],
      dateAdded: new Date('2023-08-18T06:21:58.536Z'),
      updatedAt: new Date('2023-08-18T06:21:58.536Z'),
    };

    (projectModel.create as jest.Mock).mockResolvedValue(mockCreatedProject);

    const result = await projectService.createProject(createProjectDto);

    expect(result).toEqual(mockCreatedProject);
  });

  // get project by id
  it('should find project by id', async () => {
    jest.spyOn(projectModel, 'findById').mockResolvedValue(mockProject);

    const result = await projectService.getProjectById(mockProject._id);
    expect(projectModel.findById).toHaveBeenCalledWith(mockProject._id);
    expect(result).toEqual(mockProject);
  });

  it('should throw not found exception when given unknown id', async () => {
    const id = 'veryInvalidId';
    jest.spyOn(projectModel, 'findById').mockResolvedValue(null);

    await expect(projectService.getProjectById(id)).rejects.toThrow(
      NotFoundException,
    );

    expect(projectModel.findById).toHaveBeenCalledWith(id);
  });
});
