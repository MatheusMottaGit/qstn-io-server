import { Question, Quiz } from '../dtos/quiz-attributes';

export abstract class QuizRepository {
  abstract find(id: string): Promise<Quiz>;

  abstract create(name: string, description: string): Promise<Quiz>;

  abstract addQuestion(question: Question): Promise<Question>;
}
