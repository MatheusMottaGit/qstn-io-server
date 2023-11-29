import { PrismaService } from 'src/services/prisma.services';
import { QuizRepository } from '../quiz-repository';
import { Question, Quiz } from 'src/quiz/dtos/quiz-attributes';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuizRepository implements QuizRepository {
  constructor(private prisma: PrismaService) {}

  addQuestion(question: Question): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  async create(name: string, description: string): Promise<Quiz> {
    return await this.prisma.quiz.create({
      data: {
        name: name,
        description: description,
      },
    });
  }

  async find(id: string): Promise<Quiz> {
    return await this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
  }
}
