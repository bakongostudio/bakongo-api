"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mail = require('@sendgrid/mail'); var _mail2 = _interopRequireDefault(_mail);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Token = require('../models/Token'); var _Token2 = _interopRequireDefault(_Token);

_mail2.default.setApiKey(process.env.APP_SENDGRID_API_KEY)

class AuthController {
  /**
   *
   *
   * @route POST api/auth/register
   * @desc Register user
   * @access Public
   * @memberof AuthController
   */
  async register (req, res) {
    try {
      const userExists = await _User2.default.findOne({ where: { email: req.body.email } })

      if (userExists) {
        return res
          .status(401)
          .json({
            message: 'The email address you have entered' +
          'is already associated with another account.'
          })
      }

      const newUser = new (0, _User2.default)({ ...req.body, role: 'client' })
      const userCreated = await newUser.save()
      // const usersCreated = await User.create(newUser)

      this.sendEmail(userCreated, req, res)

      return res.json({ userCreated })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await _User2.default.findOne({ email })

      if (!user) {
        return res.status(401).json({
          msg: `The email address ${email} is not
          associated with any account. Please double-check your email address
          and try again.`
        })
      }

      if (!user.checkPassword(password)) {
        return res.status(401).json({ message: 'Password invalid' })
      }

      if (!user.is_verified) {
        return res.status(401).json({
          type: 'not-verified', message: 'your account has not verified.'
        })
      }

      res.status(200).json({ token: user.generateJWT(), user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async verify (req, res) {
    if (!req.params.token) {
      return res.status(400).json({
        message: 'We were unable to find a user for this token.'
      })
    }

    try {
      const token = await _Token2.default.findOne({ token: req.params.token })

      if (!token) {
        return res.status(400).json({
          message: 'We were unable to find a valid token. Your token may have expired.'
        })
      }

      _User2.default.findOne({ id: token.user_id }, (_err, user) => {
        if (!user) {
          return res.status(400).json({
            message: 'We were unable to find a user for this token.'
          })
        }

        if (user.is_verified) {
          return res.status(400).json({
            message: 'This user has already been verified.'
          })
        }

        user.is_verified = true
        user.save(function (err) {
          if (err) {
            return res.status(500).json({ message: err.message })
          }

          res.status(200).json({ message: 'The account has been verified, please login.' })
        })
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async resendToken (req, res) {
    try {
      const { email } = req.body

      const user = await _User2.default.findOne({ email })

      if (!user) {
        return res.status(401).json({
          message: `The email address ${email} is not
          associated with any account. Please double-check your email address
          and try again.`
        })
      }

      if (user.is_verified) {
        res.status(400).json({
          message: 'This account has already verified.'
        })
      }

      this.sendEmail(user, req, res)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  sendEmail (user, req, res) {
    const token = user.generateVerificationToken()

    token.save(function (err) {
      if (err) {
        return res.status(500).json({ message: err.message })
      }
    })

    const link = `http:// ${req.headers.host}/api/auth/verify/${token.token}`

    const mailOption = {
      to: user.email,
      from: process.env.APP_FROM_EMAIL,
      subject: 'Account Verification Token',
      text: `Hi ${user.first_name} \n
      Please click on the following ling ${link} to verify your account. \n
      If you not request this, please ignore this email. \n`
    }

    _mail2.default.send(mailOption, (error, result) => {
      if (error) return res.status(500).json({ message: error.message })

      res.status(200).json({
        message: `Verification email has been sent to ${user.email}`
      })
    })
  }
}

exports. default = new AuthController()
