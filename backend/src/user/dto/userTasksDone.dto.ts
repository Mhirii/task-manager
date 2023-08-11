import { Task } from '../../schemas/task.schema';
import { ApiProperty } from "@nestjs/swagger";

export class UserTasksDoneDto {
  @ApiProperty()
  tasksDone: Task[];
}
