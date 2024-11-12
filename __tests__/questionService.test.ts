import 'reflect-metadata';
import { QuestionService } from '../src/services/question.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('QuestionService', () => {
  let questionService: QuestionService;

  beforeEach(() => {
    questionService = new QuestionService();
  });

  it('should fetch questions successfully', async () => {
    const mockResponse = {
      data: {
        date: '2024-11-10',
        data: [{ question_id: '1', question: 'Sample question' }],
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await questionService.fetchQuestions();
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error if fetch fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(questionService.fetchQuestions()).rejects.toThrow(
      'Error fetching data from external API'
    );
  });
});
