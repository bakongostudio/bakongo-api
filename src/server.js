const express = require("express");
class App {
  constructor() {
    this.express = express();
    this.devMode = process.env.NODE_ENV !== "production";

    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(express.json());
  }
  routes() {}
}

module.exports = new App().express;
