import { Controller, Get, Param } from '@nestjs/common';
import { FindQuizRequestParams } from '../dtos/find-quiz-request-body';
import { z } from 'zod';
import { QuizRepository } from '../repositories/quiz-repository';

@Controller('quiz')
export class QuizController {
  constructor(private quizRepository: QuizRepository) {}

  @Get(':id')
  async findQuiz(@Param() findQuizDto: FindQuizRequestParams) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(findQuizDto);

    let quiz = await this.quizRepository.find(id);

    return { quiz };
  }
}
