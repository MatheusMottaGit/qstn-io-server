import { Question, Quiz } from '../dtos/quiz-attributes';

export abstract class QuizRepository {
  abstract find(id: string): Promise<Quiz>;

  abstract create(name: string, description: string): Promise<Quiz>;

  abstract list(): Promise<Quiz[]>;

  abstract addQuestion(id: string, questions: Question[]): Promise<Question[]>;

  abstract deleteAllQuestions(id: string): Promise<void>;
}
