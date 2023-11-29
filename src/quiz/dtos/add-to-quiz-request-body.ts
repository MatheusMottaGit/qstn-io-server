import { IsNotEmpty } from 'class-validator';

export class addQuestionToQuizRequestBody {
  @IsNotEmpty()
  amount: number;
  category: number;
  type: string;
  difficulty: string;
}
