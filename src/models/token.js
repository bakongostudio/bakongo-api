import { Model, Sequelize } from 'sequelize';

class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.STRING,
        token: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Token;
