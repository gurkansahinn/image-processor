import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from './logger';
import { RegisterRoutes } from './transportation/generated/routes';

export function createHttpServer(): void {
  const port = process.env.PORT || 3000;
  const app = express();

  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use('/swagger', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
    return res.send(
      swaggerUi.generateHTML(await import('./transportation/generated/swagger.json')),
    );
  });

  RegisterRoutes(app);
  app.listen(port, () => logger.info(`🚀 Image API is started on port ${port}`));
}
