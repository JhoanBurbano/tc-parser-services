import { Request, Response, NextFunction } from 'express';
import { ApiFormattedResponse } from '../types/common.types';
import { mapResponseToApiFormattedResponse } from '../mappers/question.mapper';
import { CONFIG } from '../config/environment.config';
import { autoInjectable } from 'tsyringe';
import { QuestionService } from '../services/question.service';

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Obtiene preguntas en un formato específico
 *     description: Consume un servicio externo, transforma los datos y devuelve un objeto con título, fecha y preguntas.
 *     responses:
 *       200:
 *         description: Datos transformados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                   example: "Preguntas transformadas"
 *                 dia:
 *                   type: string
 *                   example: "DD-MM-YYYY"
 *                 info:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pregunta_id:
 *                         type: integer
 *                         example: 1
 *                       pregunta:
 *                         type: string
 *                         example: "¿Cuál es tu nombre?"
 *                 api_version:
 *                   type: integer
 *                   example: 1
 */

@autoInjectable()
export class QuestionController {
  constructor(private QuestionService: QuestionService) {}
  async getQuestions(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.QuestionService.fetchQuestions();

      const response: ApiFormattedResponse = mapResponseToApiFormattedResponse(
        CONFIG.CUSTOM.TITLE_RESPONSE,
        data.date,
        data.data,
        Number(CONFIG.API.VERSION || 1)
      );

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
