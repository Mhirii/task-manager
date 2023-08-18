import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsService } from '../projects/projects.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProjectsModule],
      controllers: [UserController],
      providers: [
        UserService,
        ProjectsService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
