import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/entities/user-entity';

@Module({
  imports: [UserController],
  controllers: [AppController],
})
export class AppModule {}
