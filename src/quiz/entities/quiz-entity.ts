import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { QuizRepository } from '../repositories/quiz-repository';
import { CreateQuizRequestBody } from '../dtos/create-quiz-request-body';
import { z } from 'zod';
import { AddQuestionToQuizBody } from '../dtos/add-question-dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizRepository: QuizRepository) {}

  @Post('create')
  async createQuiz(@Body() createQuizDto: CreateQuizRequestBody) {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = bodySchema.parse(createQuizDto);

    let quiz = await this.quizRepository.create(name, description);

    return { quiz };
  }

  @Get('all')
  async listQuizzes() {
    return this.quizRepository.list();
  }

  @Get(':id')
  async getQuiz(@Param('id') id: string) {
    const quiz = await this.quizRepository.find(id);

    if (!quiz) {
      throw new NotFoundException('resource not found.');
    }

    return { quiz };
  }

  @Post(':id/add')
  async addQuestionToQuiz(
    @Param('id') id: string,
    @Body() addQuestionBody: AddQuestionToQuizBody,
  ) {
    const { questions } = addQuestionBody;

    const quiz = await this.quizRepository.find(id);

    if (!quiz) {
      throw new NotFoundException('quiz not found.');
    }

    const createdQuestions = await this.quizRepository.addQuestion(
      id,
      questions,
    );

    return createdQuestions;
  }

  @Delete(':id/delete')
  async deleteAllQuestionsFromQuiz(@Param('id') id: string) {
    return await this.quizRepository.deleteAllQuestions(id);
  }
}
