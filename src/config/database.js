module.exports = {
  dialect: 'postgres',
  host: APP_DB_HOST,
  username: APP_DB_USERNAME,
  password: APP_DB_PASSWORD,
  database: APP_DB_DATABASE,
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
