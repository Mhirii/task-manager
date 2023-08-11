import { Project } from '../../schemas/project.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UserProjectsDto {
  @ApiProperty()
  projects: Project[];
}
