import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from '../src/app/routes/index.routes';
import errorHandler from './app/middlewares/errorHandler';

const app: Application = express();

// Enable cors support
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads.
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

// Test root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('okk!');
});

export default app;
