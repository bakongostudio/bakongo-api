import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import Token from './Token'

class User extends Model {
  static init (sequelize) {
    super.init(
      {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        thumb: Sequelize.STRING,
        document: Sequelize.STRING,
        genre: Sequelize.INTEGER,
        birthday: Sequelize.DATE,
        cell: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        role: Sequelize.INTEGER,
        blocking_reason: Sequelize.STRING,
        is_verified: Sequelize.BOOLEAN,
        reset_password_token: Sequelize.STRING,
        reset_password_expires: Sequelize.STRING
      },
      {
        sequelize
      }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
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

    return jwt.sign(payload, process.env.APP_JWT_SECRET, {
      expiresIn: parseInt(expireDate.getTime() / 1000, 10)
    })
  }

  generatePasswordReset () {
    this.reset_password_token = crypto.randomBytes(20).toString('hex')
    this.reset_password_expires = Date.now() + 3600000
  }

  generateVerificationToken () {
    const payload = {
      user_id: this.id,
      token: crypto.randomBytes(20).toString('hex')
    }
    return new Token(payload)
  }
}

export default User
