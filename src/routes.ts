// import Endpoints
import { Express } from 'express';
import reportingRoutes from './controller/reportingController';

export default function initRoutes(app: Express) {
  app.use('/api', reportingRoutes);
}
