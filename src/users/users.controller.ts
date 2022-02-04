import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('/user/create')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: User) {
    const response: User = await this.userService.create(user);
    return {
      description: 'created user with success',
      username: response.username,
      id: response._id.toString(),
    };
  }
}
