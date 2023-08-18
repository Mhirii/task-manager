import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { UserModule } from '../user/user.module';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TasksService;
  let spyModelUser: Model<User>;
  let spyModelTask: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UserModule],
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: Model,
        },
        {
          provide: UserService,
          useClass: Model,
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TasksService>(TasksService);
    spyModelTask = module.get<Model<Task>>(getModelToken(Task.name));
    // spyModelUser = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
});
