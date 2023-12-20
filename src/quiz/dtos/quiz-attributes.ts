export class Quiz {
  id?: string;
  name?: string;
  description?: string;
  questions?: Question[];
}

export class Question {
  id?: string;
  category?: string;
  type?: string;
  difficulty?: string;
  question?: { text: string };
  correctAnswer?: string;
  incorrectAnswers?: IncorrectAnswer[];
}

export class IncorrectAnswer {
  id?: string;
  option?: string;
  questionId?: string;
}
