import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  //Promise<User | undefined>
  async findOne(username: string) {
    // return this.users.find((user) => user.username === username);
  }

  async create(user: User) {
    return this.usersRepository.save(user);
  }
}
