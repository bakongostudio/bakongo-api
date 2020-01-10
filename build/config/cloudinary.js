"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);

_cloudinary2.default.config({
  cloud_name: process.env.APP_CLOUDNARY_API_NAME,
  api_key: process.env.APP_CLOUDNARY_API_KEY,
  api_secret: process.env.APP_CLOUDNARY_API_SECRETE
})

exports. default = _cloudinary2.default
