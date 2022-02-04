import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  //Promise<User | undefined>
  async findOne(username: string) {
    return this.usersRepository.findOne(username);
  }

  async create(user: User) {
    const result: User = await this.findOne(user.username);
    console.log(result);
    if (result) {
      console.log('uéeeeee');
      throw new ConflictException({
        description: 'user already exist',
        username: user.username,
      });
    }
    return this.usersRepository.save(user);
  }
}
