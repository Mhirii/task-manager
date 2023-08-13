import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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
  @MaxLength(100)
  readonly desc: string;

  @ApiProperty()
  readonly project_id: string;

  @ApiProperty()
  readonly subtasks: {
    subtask_id: string;
    title: string;
    order: number;
  }[];

  @ApiProperty()
  @IsNotEmpty()
  readonly dateAdded: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly due: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly updatedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly isDone: boolean;

  @ApiProperty()
  @IsOptional()
  readonly completed: Date | null;
}
