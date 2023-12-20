import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Question } from './quiz-attributes';

export class AddQuestionToQuizBody {
  @IsNotEmpty()
  questions: Question[];
}
