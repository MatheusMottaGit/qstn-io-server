import { IsNotEmpty } from 'class-validator';

export class CreateQuizRequestBody {
  @IsNotEmpty()
  name: string;
  description: string;
}
