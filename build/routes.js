"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express'); var _express2 = _interopRequireDefault(_express);

const routes = _express2.default.Router()

routes.get('/', (req, res, next) => {
  res.status(200).json({ message: 'We are on!' })

  next()
})

exports. default = routes
