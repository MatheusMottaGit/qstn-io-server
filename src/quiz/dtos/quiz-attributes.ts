export class Quiz {
  id?: string;
  name?: string;
  description?: string;
  questions?: Question[];
}

export class Question {
  amount?: number;
  category?: number;
  type?: string;
  difficulty?: string;
}
