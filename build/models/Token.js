"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Token extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: _sequelize.Sequelize.STRING,
        token: _sequelize.Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }
}

exports. default = Token;
