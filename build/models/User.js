"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);

var _Token = require('./Token'); var _Token2 = _interopRequireDefault(_Token);

class User extends _sequelize.Model {
  static init (sequelize) {
    super.init(
      {
        first_name: _sequelize2.default.STRING,
        last_name: _sequelize2.default.STRING,
        thumb: _sequelize2.default.STRING,
        document: _sequelize2.default.STRING,
        genre: _sequelize2.default.INTEGER,
        birthday: _sequelize2.default.DATE,
        cell: _sequelize2.default.STRING,
        phone: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        role: _sequelize2.default.INTEGER,
        blocking_reason: _sequelize2.default.STRING,
        is_verified: _sequelize2.default.BOOLEAN,
        reset_password_token: _sequelize2.default.STRING,
        reset_password_expires: _sequelize2.default.STRING
      },
      {
        sequelize
      }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8)
      }
    })

    return this
  }

  checkPassword (password) {
    return _bcryptjs2.default.compare(password, this.password_hash)
  }

  generateJWT () {
    const today = new Date()
    const expireDate = new Date(today)

    expireDate.setDate(today.getDate() + 60)

    const payload = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email
    }

    return _jsonwebtoken2.default.sign(payload, process.env.APP_JWT_SECRET, {
      expiresIn: parseInt(expireDate.getTime() / 1000, 10)
    })
  }

  generatePasswordReset () {
    this.reset_password_token = _crypto2.default.randomBytes(20).toString('hex')
    this.reset_password_expires = Date.now() + 3600000
  }

  generateVerificationToken () {
    const payload = {
      user_id: this.id,
      token: _crypto2.default.randomBytes(20).toString('hex')
    }
    return new (0, _Token2.default)(payload)
  }
}

exports. default = User
