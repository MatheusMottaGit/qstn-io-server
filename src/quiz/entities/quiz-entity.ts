import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { QuizRepository } from '../repositories/quiz-repository';
import { CreateQuizRequestBody } from '../dtos/create-quiz-request-body';
import axios from 'axios';
import { z } from 'zod';
import { FindQuizRequestParams } from '../dtos/find-quiz-request-params';
import { addQuestionToQuizRequestBody } from '../dtos/add-to-quiz-request-body';

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

  @Get(':id')
  async getQuiz(@Param() findQuizDto: FindQuizRequestParams) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(findQuizDto);

    const quiz = await this.quizRepository.find(id);

    return { quiz };
  }

  @Post('add/:amount')
  async addQuestionToQuiz(@Param() addToQuizDto: addQuestionToQuizRequestBody) {
    const paramsSchema = z.object({
      amount: z.number(),
      category: z.number(),
      type: z.string(),
      difficulty: z.string(),
    });

    const question = paramsSchema.parse(addToQuizDto);
  }
}
