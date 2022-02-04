/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty} from 'class-validator';
import { Transform } from 'class-transformer';
import hashPassword from '../util/bcrypt';

export class User {
    _id?: string;

    @IsString()
    @IsNotEmpty({ message: 'username is mandatory' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'password is mandatory' })
    @Transform( hashPassword, {toClassOnly: true})
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'email is mandatory' })
    email: string;
}
