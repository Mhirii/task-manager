import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Public()
  @Get('/:id')
  async getUserById(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }

  @Public()
  @Get('username/:username')
  async getUserByName(@Res() response, @Param('username') username: string) {
    try {
      const user = await this.userService.getUserByName(username);
      return response.status(HttpStatus.OK).json(user);
    } catch (error) {
      return response.status(error.status).json(error.responses);
    }
  }
}
