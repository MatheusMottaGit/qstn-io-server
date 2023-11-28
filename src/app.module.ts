import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [UserModule, QuizModule],
})
export class AppModule {}
