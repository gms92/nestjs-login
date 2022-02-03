/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty} from 'class-validator';
import { Transform } from 'class-transformer';
import hashPassword from 'src/util/bcrypt';

export class User {
    @IsString()
    @IsNotEmpty({ message: 'username is mandatory' })
    username: string;

    @IsNotEmpty({ message: 'password is mandatory' })
    @Transform( hashPassword, {toClassOnly: true})
    password: any;

    @IsString()
    @IsNotEmpty({ message: 'email is mandatory' })
    email: string;
}
