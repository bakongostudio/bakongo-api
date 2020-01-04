import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(compare, this.password_hash);
  }
}

export default User;
