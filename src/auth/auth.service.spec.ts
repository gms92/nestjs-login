import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.schema';
import { MongoConfig } from '../config/mongo.config';

describe('AuthService', () => {
  let service: AuthService;
  let app: TestingModule;

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
      providers: [AuthService, LocalStrategy],
      exports: [AuthService],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });
  afterEach(async () => {
    // await repository.dropCollection();
    app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
