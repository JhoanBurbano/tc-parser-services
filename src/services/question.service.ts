import axios from 'axios';
import { CONFIG } from '../config/environment.config';
import { ApiResponse } from '../types/question.type';
import { injectable } from 'tsyringe';

@injectable()
export class QuestionService {
  async fetchQuestions(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(CONFIG.API.URL, {
        headers: { Authorization: `Bearer ${CONFIG.API.AUTH_TOKEN}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data from external API');
    }
  }
}
