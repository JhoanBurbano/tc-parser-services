// src/app.ts
import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
1;
import { swaggerDocs } from './config/swaggerConfig';

import { QuestionController } from './controllers/question.controller';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { container } from 'tsyringe';

const app = express();

// Configura el controlador con tsyringe
const questionController = container.resolve(QuestionController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api/questions', (req, res, next) =>
  questionController.getQuestions(req, res, next)
);
app.use(errorHandler);

export default app;
