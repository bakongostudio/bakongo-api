import sendgridMail from '@sendgrid/mail'

import User from '../models/User'

sendgridMail.setApiKey(process.env.APP_SENDGRID_API_KEY)

class PasswordController {
  async recover (req, res) {
    try {
      const { email } = req.body

      const user = await User.findOne({ email })

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

          sendgridMail.send(mailOptions, (error, result) => {
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

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async resetPassword (req, res) {}
}

export default new PasswordController()
