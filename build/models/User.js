"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize.Sequelize.STRING,
        email: _sequelize.Sequelize.STRING,
        password_hash: _sequelize.Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(compare, this.password_hash);
  }
}

exports. default = User;
