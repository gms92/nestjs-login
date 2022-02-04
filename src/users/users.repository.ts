import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('users') private readonly users: Model<UsersModel>,
  ) {}

  async save(user: User) {
    try {
      return await this.users.create(user);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async findOne(username: string) {
    try {
      return await this.users.findOne({ username: username });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async dropCollection() {
    await this.users.collection.drop();
  }
}
