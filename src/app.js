import express from 'express';

import routes from './routes';
class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';
    process.env.TZ = 'America/Sao_Paulo';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
