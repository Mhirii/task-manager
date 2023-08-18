import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectsService } from '../projects/projects.service';
import { JwtService } from '@nestjs/jwt';
import { Project } from '../schemas/project.schema';
import { NotFoundException } from '@nestjs/common';
import { delay } from 'rxjs';

describe('UserService', () => {
  const mockUser = {
    _id: '64d5e108413d3fccbf2f55e9',
    username: 'Testing1',
    email: 'Testing1@Testing1.com',
    password: '$2b$10$TJUu.JRqRjhT05f0Za70y.ZJmcGzTGYlWWyw1XwkFlsnGZnWgO6ZK',
    HashedRefreshToken: '',
    tasksInProgress: [
      '64d5e125413d3fccbf2f55fa',
      '64d5e117413d3fccbf2f55f7',
      '64d9065cf82876554ef8f8c4',
    ],
    tasksDone: [
      '64d5e12e413d3fccbf2f55fd',
      '64d5e133413d3fccbf2f5600',
      '64d60a6beb927dcf043dafe2',
      '64d90524f82876554ef8f894',
    ],
    projects: ['64d8dc12da44ca3278973c87'],
  };
  const mockAllUsers = [
    {
      _id: '64d5e108413d3fccbf2f55e9',
      username: 'Testing1',
      email: 'Testing1@Testing1.com',
      password: '$2b$10$TJUu.JRqRjhT05f0Za70y.ZJmcGzTGYlWWyw1XwkFlsnGZnWgO6ZK',
      HashedRefreshToken: '',
      tasksInProgress: [
        '64d5e125413d3fccbf2f55fa',
        '64d5e117413d3fccbf2f55f7',
        '64d9065cf82876554ef8f8c4',
      ],
      tasksDone: [
        '64d5e12e413d3fccbf2f55fd',
        '64d5e133413d3fccbf2f5600',
        '64d60a6beb927dcf043dafe2',
        '64d90524f82876554ef8f894',
      ],
      projects: ['64d8dc12da44ca3278973c87'],
    },
    {
      _id: '64d9132df82876554ef8f9a2',
      username: 'Chart123',
      email: 'Chart@Chart.com',
      password: '$2b$10$t5jZreklxr5AhHwLspU7g.dnNzA/Nvu.X1ehfyao4daaz3EQ2AWjq',
      HashedRefreshToken:
        '$2b$10$zM39OIqqKnwGbnzuQIRGO.0kX88mbqvLAWJtDwAKuC2u3SkouPnb2',
      tasksInProgress: ['64da0e70f82876554ef8fb71'],
      tasksDone: ['64d9135ff82876554ef8f9b9'],
      projects: ['64db6ea842af732c3b1e77b8', '64db879142af732c3b1e78b6'],
    },
  ];
  const mockUserService = {
    findById: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const mockProjectService = {
    findProjectsByIds: jest.fn(),
  };
  let userService: UserService;
  let userModel: Model<User>;
  let jwtService: JwtService;
  let projectService: ProjectsService;
  let projectModel: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ProjectsService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Project.name),
          useValue: mockProjectService,
        },
      ],
    }).compile();
    projectService = module.get<ProjectsService>(ProjectsService);
    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    projectModel = module.get<Model<Project>>(getModelToken(Project.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // fetch
  it('should get user by id', async () => {
    jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser);

    const result = await userService.getUserById(mockUser._id);
    expect(userModel.findById).toHaveBeenCalledWith(mockUser._id);
    expect(result).toEqual(mockUser);
  });

  it('should throw NotFoundException when given unknown id', async () => {
    const id = 'veryInvalidId';
    jest.spyOn(userModel, 'findById').mockResolvedValue(null);

    await expect(userService.getUserById(id)).rejects.toThrow(
      NotFoundException,
    );

    expect(userModel.findById).toHaveBeenCalledWith(id);
  });

  it('should get all users', async () => {
    jest.spyOn(userModel, 'find').mockResolvedValue(mockAllUsers);

    const result = await userService.getAllUsers();
    expect(result).toEqual(mockAllUsers);
  });

  it('should get user by username', async () => {
    const username = 'Testing1';
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
    const result = await userService.getUserByName(username);

    expect(result).toEqual(mockUser);
  });
});
