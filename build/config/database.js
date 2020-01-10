"use strict";module.exports = {
  dialect: 'postgres',
  host: process.env.APP_DB_HOST,
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_DATABASE,
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
