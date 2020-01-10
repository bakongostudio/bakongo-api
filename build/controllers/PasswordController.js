"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mail = require('@sendgrid/mail'); var _mail2 = _interopRequireDefault(_mail);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

_mail2.default.setApiKey(process.env.APP_SENDGRID_API_KEY)

class PasswordController {
  async recover (req, res) {
    try {
      const { email } = req.body

      const user = await _User2.default.findOne({ email })

      if (!user) {
        return res.status(401).json({
          message: `The email address ${email}
          is not associated with any account`
        }) // TODO check if will need to change de const ${email} insted of ${req.body.email}
      }

      user.generatePasswordReset()

      user.save()
        .then(user => {
          const link = `https://${req.headers.host}/api/auth/reset/${user.reset_password_token}`

          const mailOptions = {
            to: user.email,
            from: process.env.APP_FROM_MAIL,
            subject: 'Password change request',
            text: `Hi ${user.first_name} \n\n
            Please click on the following lint ${link} to reset your password. \n\n
            If you did not request this, please ignore this email and password
            will remail unchanged. \n`
          }

          _mail2.default.send(mailOptions, (error, _result) => {
            if (error) {
              return res.status(500).json({ message: error.message })
            }

            res.status(200).json({
              message: `A reset email has been sent to ${user.email}.`
            })
          })
        })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async reset (req, res) {
    try {
      const { token } = req.params

      const user = await _User2.default
        .findOne({
          reset_password_token: token,
          reset_password_expires: { $gt: Date.now() }
        })

      if (!user) {
        return res.status(401).json({
          message: 'Password reset is invalid or has expired.'
        })
      }

      res.render('reset', { user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async resetPassword (req, res) {
    _User2.default.findOne({
      reset_password_token: req.params.token,
      reset_password_expires: { $gt: Date.now() }
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'Password token is invalid or has expired.'
          })
        }

        user.password_hash = req.body.password_hash
        user.reset_password_token = undefined
        user.reset_password_expires = undefined
        user.is_verified = true

        user.save((err) => {
          if (err) return res.status(500).json({ message: err.message })

          const mailOptions = {
            to: user.email,
            from: process.env.APP_FROM_MAIL,
            subject: 'Password has been Changed!',
            text: `Hi ${user.first_name} \n
            This is a confirmation that the password of your account
            ${user.email} has been changed.\n\n`
          }

          _mail2.default.send(mailOptions, (error, result) => {
            if (error) return res.status(500).json({ message: error.message })

            res.status(200).json({ message: 'Your password has been updated.' })
          })
        })
      })
  }
}

exports. default = new PasswordController()
