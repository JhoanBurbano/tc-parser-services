import { ApiFormattedResponse, FormattedQuestion } from '../types/common.types';
import { Question } from '../types/question.type';
import { formatToDDMMYYYY } from '../utils/dateFormatter';

export const mapQuestionToFormattedQuestion = (
  question: Question
): FormattedQuestion => {
  return {
    pregunta_id: parseInt(question.question_id),
    pregunta: question.question,
  };
};

export const mapResponseToApiFormattedResponse: (
  title: string,
  date: string,
  questions: Question[],
  api_version?: number
) => ApiFormattedResponse = (title, date, questions, api_version = 1) => {
  return {
    titulo: title,
    dia: formatToDDMMYYYY(date),
    info: questions.map(mapQuestionToFormattedQuestion),
    api_version,
  };
};
