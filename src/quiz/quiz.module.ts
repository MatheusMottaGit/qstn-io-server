import { Module } from '@nestjs/common';
import { QuizController } from './entities/quiz-entity';
import { PrismaService } from 'src/services/prisma.services';
import { PrismaQuizRepository } from './repositories/prisma/prisma-quiz-repository';
import { JwtModule } from '@nestjs/jwt';
import { QuizRepository } from './repositories/quiz-repository';

@Module({
  imports: [JwtModule],
  controllers: [QuizController],
  providers: [
    PrismaService,
    {
      provide: QuizRepository,
      useClass: PrismaQuizRepository,
    },
  ],
})
export class QuizModule {}
