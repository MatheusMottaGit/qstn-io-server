import { PrismaService } from 'src/services/prisma.services';
import { QuizRepository } from '../quiz-repository';
import { Quiz } from 'src/quiz/dtos/quiz-attributes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuizRepository implements QuizRepository {
  constructor(private prisma: PrismaService) {}

  async find(id: string): Promise<Quiz> {
    return await this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
  }
}
