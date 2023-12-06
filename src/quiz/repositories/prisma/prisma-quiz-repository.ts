import { PrismaService } from 'src/services/prisma.services';
import { QuizRepository } from '../quiz-repository';
import { Question, Quiz } from 'src/quiz/dtos/quiz-attributes';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuizRepository implements QuizRepository {
  constructor(private prisma: PrismaService) {}

  async addQuestion(id: string, question: Question): Promise<Question> {
    const existingQuestion = await this.prisma.question.findUnique({
      where: {
        id: question.id,
      },
    });

    if (existingQuestion) {
      throw new ConflictException('this question is already in your quiz.');
    }

    return await this.prisma.question.create({
      data: {
        statement: question.statement,
        category: question.category,
        difficulty: question.difficulty,
        type: question.type,
        correct_answer: question.correct_answer,
        incorrect_answers: {
          create: question.incorrect_answers.map((answer) => ({
            option: answer,
          })),
        },
        quiz: {
          connect: {
            id: id,
          },
        },
      },
    });
  }

  async list(): Promise<Quiz[]> {
    const quizzes = await this.prisma.quiz.findMany({
      orderBy: {
        created_at: 'desc',
      },

      include: {
        questions: true,
      },
    });

    return quizzes;
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

      include: {
        questions: true,
      },
    });
  }
}
