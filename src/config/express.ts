import cors from 'cors';
import express, { Express } from 'express';

export default async function configExpress(app: Express) {
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.use(express.json({ limit: '50mb' }));
  app.use(cors({}));
}
