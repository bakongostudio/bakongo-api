"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
class App {
  constructor () {
    this.express = _express2.default.call(void 0, )
    this.isDev = process.env.NODE_ENV !== 'production'
    process.env.TZ = 'America/Sao_Paulo'

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(_express2.default.json())
  }

  routes () {
    this.express.use(_routes2.default)
  }
}

exports. default = new App().express
