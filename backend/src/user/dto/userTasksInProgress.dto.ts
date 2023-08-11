import { Task } from '../../schemas/task.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UserTasksProgressDto {
  @ApiProperty()
  tasksInProgress: Task[];
}
