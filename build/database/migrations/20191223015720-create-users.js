"use strict";'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
