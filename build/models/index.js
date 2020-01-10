"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});'use strict'

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// const env = process.env.NODE_ENV || "development";
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
const basename = _path2.default.basename(__filename)
const db = {}

const sequelize = new (0, _sequelize2.default)(
  _database2.default.database,
  _database2.default.username,
  _database2.default.password,
  _database2.default
)

_fs2.default.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = sequelize.import(_path2.default.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = _sequelize2.default

exports. default = db
