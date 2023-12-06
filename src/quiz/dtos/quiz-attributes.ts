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
  statement?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
}
