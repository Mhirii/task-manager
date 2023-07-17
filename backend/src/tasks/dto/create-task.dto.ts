import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(100)
  readonly desc: string;

  @IsString()
  readonly project_id: string;

  readonly subtasks: {
    subtask_id: string;
    title: string;
    color: string;
  }[];

  @IsNotEmpty()
  readonly dateAdded: Date;

  readonly due: Date;
}
