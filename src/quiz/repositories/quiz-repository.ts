import { Quiz } from '../dtos/quiz-attributes';

export abstract class QuizRepository {
  abstract find(id: string): Promise<Quiz>;
}
