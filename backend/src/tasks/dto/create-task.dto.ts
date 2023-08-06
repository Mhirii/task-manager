import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly owner: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(100)
  readonly desc: string;

  readonly project_id: string;

  readonly subtasks: {
    subtask_id: string;
    title: string;
    order: number;
  }[];

  @IsNotEmpty()
  readonly dateAdded: Date;

  @IsNotEmpty()
  readonly due: Date;

  @IsNotEmpty()
  readonly updatedAt: Date;

  @IsNotEmpty()
  readonly isDone: boolean;
}
