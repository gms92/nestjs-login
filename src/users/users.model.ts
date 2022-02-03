import { Document } from 'mongoose';

export interface UsersModel extends Document {
  readonly username: string;
  readonly password: string;
  readonly email: string;
}
