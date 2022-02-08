import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongoConfig } from '../config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.schema';
import { User } from 'src/users/users.entity';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MongoConfig.MONGODB_TEST_URI),
        MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
      ],
      providers: [UsersService, UsersRepository],
    }).compile();

    service = app.get<UsersService>(UsersService);
    repository = app.get<UsersRepository>(UsersRepository);
  });

  afterEach(async () => {
    await repository.dropCollection();
    app.close();
  });

  describe('.create', () => {
    it('create a user', async () => {
      const user: User = {
        username: 'teste',
        password: 'teste12345',
        email: 'teste@teste.com',
      };
      const result: User = await service.create(user);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(typeof result._id.toString()).toBe('string');
    });

    it('does not allow create a user if username already exists', async () => {
      try {
        const user: User = {
          username: 'teste',
          password: 'teste12345',
          email: 'teste@teste.com',
        };
        await service.create(user);

        const user2: User = {
          username: 'teste',
          password: 'teste123456',
          email: 'teste2e@teste.com',
        };
        await service.create(user2);
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(409);
      }
    });
  });
});
