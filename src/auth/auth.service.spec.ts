import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.schema';
import { MongoConfig } from '../config/mongo.config';
import { User } from '../users/users.entity';
import { AuthModule } from './auth.module';
import { HashPasswordService } from './hash.password.service';

describe('AuthService', () => {
  let app: TestingModule;
  let authService: AuthService;
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        AuthModule,
        MongooseModule.forRoot(MongoConfig.MONGODB_TEST_URI),
        MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    usersService = app.get<UsersService>(UsersService);
    usersRepository = app.get<UsersRepository>(UsersRepository);
  });
  afterEach(async () => {
    await usersRepository.dropCollection();
    app.close();
  });

  describe('.validateUser', () => {
    it('validates a user if it exists in the database', async () => {
      const user: User = {
        username: 'teste',
        password: HashPasswordService.hashPassword('teste12345'),
        email: 'teste@teste.com',
      };
      await usersService.create(user);

      const result: User | null = await authService.validateUser(
        user.username,
        'teste12345',
      );

      expect(result).toBe(user.username);
    });
    
    it('invalidates a user if it not exists in the database', async () => {
      const user: User = {
        username: 'teste',
        password: HashPasswordService.hashPassword('teste12345'),
        email: 'teste@teste.com',
      };

      const result: User | null = await authService.validateUser(
        user.username,
        'teste12345',
      );

      expect(result).toBe(null);
    });
  });
});
