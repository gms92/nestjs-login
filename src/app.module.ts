import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from './config/mongo.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(MongoConfig.MONGODB_URI),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
