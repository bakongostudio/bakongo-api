module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'bsagency',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
