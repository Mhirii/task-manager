import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Task } from '../../schemas/task.schema';
export class CreateProjectDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly owner: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;

  readonly tasks: string[];

  @IsNotEmpty()
  readonly dateAdded: Date;

  @IsNotEmpty()
  readonly updatedAt: Date;
}
