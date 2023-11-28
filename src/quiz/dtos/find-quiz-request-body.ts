import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindQuizRequestParams {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
