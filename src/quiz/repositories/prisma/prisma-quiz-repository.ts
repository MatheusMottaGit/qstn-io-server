import { PrismaService } from 'src/services/prisma.services';
import { QuizRepository } from '../quiz-repository';
import { Question, Quiz } from 'src/quiz/dtos/quiz-attributes';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuizRepository implements QuizRepository {
  constructor(private prisma: PrismaService) {}

  async deleteAllQuestions(id: string): Promise<void> {
    await this.prisma.trivia.deleteMany({
      where: {
        quizId: id,
      },
    });
  }

  async addQuestion(id: string, questions: Question[]): Promise<Question[]> {
    const existingQuestions = await this.prisma.trivia.findMany({
      where: {
        question: {
          text: {
            in: questions
              .map((question) => question.question.text)
              .filter((text) => text !== undefined),
          },
        },
      },

      select: {
        question: {
          select: {
            text: true,
          },
        },
      },
    });

    const existingStatements = new Set(
      existingQuestions.map((question) => question.question.text),
    );

    const duplicateStatements = questions
      .map((question) => question.question.text)
      .filter((text) => existingStatements.has(text));

    if (duplicateStatements.length > 0) {
      throw new ConflictException(
        `questions ${duplicateStatements.join(
          ', ',
        )} already exists in your quiz.`,
      );
    }

    let createdQuestions: Question[] = [];

    for (const question of questions) {
      const createdQuestion = await this.prisma.trivia.create({
        data: {
          question: {
            create: {
              text: question.question.text,
            },
          },
          category: question.category,
          difficulty: question.difficulty,
          type: question.type,
          correctAnswer: question.correctAnswer,
          incorrectAnswers: {
            create: question.incorrectAnswers.map((answer) => ({
              option: String(answer),
            })),
          },
          quiz: {
            connect: {
              id: id,
            },
          },
        },
      });

      createdQuestions.push(createdQuestion);
    }

    console.log(createdQuestions);
    return createdQuestions;
  }

  async list(): Promise<Quiz[]> {
    const quizzes = await this.prisma.quiz.findMany({
      orderBy: {
        created_at: 'desc',
      },

      include: {
        trivias: {
          include: {
            incorrectAnswers: true,
            question: true,
          },
        },
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
        trivias: {
          include: {
            question: true,
          },
        },
      },
    });
  }
}
