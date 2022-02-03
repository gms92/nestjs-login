import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('/user/create')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: User) {
    const resp = await this.userService.create(user);
    console.log(resp);
  }
}
