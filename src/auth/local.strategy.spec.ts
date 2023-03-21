import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.schema';
import { MongoConfig } from '../config/mongo.config';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { HashPasswordService } from './hash.password.service';

describe('LocalStrategy', () => {
  let app: TestingModule;
  let usersRepository: UsersRepository;
  let usersService: UsersService;
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '600s' },
        }),
        MongooseModule.forRoot(MongoConfig.MONGODB_TEST_URI),
        MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, HashPasswordService],
      exports: [AuthService],
    }).compile();

    localStrategy = app.get<LocalStrategy>(LocalStrategy);
    usersRepository = app.get<UsersRepository>(UsersRepository);
    usersService = app.get<UsersService>(UsersService);
  });
  afterEach(async () => {
    await usersRepository.dropCollection();
    app.close();
  });

  describe('.validate', () => {
    it('validates if a user is authenticated', async () => {
      const user: User = {
        username: 'teste',
        password: HashPasswordService.hashPassword('teste12345'),
        email: 'teste@teste.com',
      };
      await usersService.create(user);

      const result: string = await localStrategy.validate(
        user.username,
        'teste12345',
      );

      expect(result).toBe(user.username);
    });

    it('throws an error when user does not exist on database', async () => {
      try {
        const user: User = {
          username: 'teste',
          password: 'teste12345',
          email: 'teste@teste.com',
        };

        await localStrategy.validate(user.username, user.password);

        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(401);
      }
    });

    it('throws an error when user provides wrong password', async () => {
      try {
        const user: User = {
          username: 'teste',
          password: 'teste12345',
          email: 'teste@teste.com',
        };
        await usersService.create(user);
        user.password = 'wrongPassword';

        await localStrategy.validate(user.username, user.password);

        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(401);
      }
    });
  });
});
