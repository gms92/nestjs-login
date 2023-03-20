import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
// import { HashPasswordService } from './hash.password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashPasswordService: HashPasswordService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }
    const matchPassword = await this.hashPasswordService.comparePassword(
      password,
      user.password,
    );

    if (!matchPassword) return null;
    return user.username;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
