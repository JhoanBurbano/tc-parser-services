export interface Question {
  question_id: string;
  question: string;
}

export interface ApiResponse {
  date: string;
  data: Question[];
}
