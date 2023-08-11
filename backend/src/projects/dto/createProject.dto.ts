import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Task } from '../../schemas/task.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly owner: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @ApiProperty()
  readonly tasks: string[];

  @ApiProperty()
  @IsNotEmpty()
  readonly dateAdded: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly updatedAt: Date;
}
