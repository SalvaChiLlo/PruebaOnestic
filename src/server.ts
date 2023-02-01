import http from 'http';
import express from 'express';
import config from './config/environment';
import configExpress from './config/express';
import initRoutes from './routes';

function main() {
  const app = express();
  const server = http.createServer(app);
  configExpress(app);
  initRoutes(app);

  server.listen(config.port, config.ip, () => {
    console.log(`Server is listening on http://${config.ip}:${config.port}`);
  });
}

main();
