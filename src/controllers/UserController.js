import multer from 'multer'
import DataURI from 'datauri'

import path from 'path'

import User from '../models/User'
import cloudinary from '../config/cloudinary'

const multer_upload = multer().single('thumb')

class UserController {
  async index (req, res) {
    try {
      const id = req.body.id
      const user = await User.findByPk({ where: { id } })

      if (!user) return res.status(401).json({ message: 'User does not exist' })

      res.status(200).json({ user })
    } catch (error) {
      res.status(500).json({ messege: error.messege })
    }
  }

  async update (req, res) {
    try {
      const update = req.body
      const id = req.body.id

      const user = await User.findByPk({ where: { id } })

      await user.update(req.body)

      res.status(200).json({ message: 'User has been updated.' })
    } catch (error) {
      res.status(500).json({ messege: error.messege })
    }
  }

  async upload (req, res) {
    multer_upload(req, res, function (err) {
      if (err) return res.status(500).json({ message: err.messege })

      const { id } = req.body
      const URI = new DataURI()
      const image = URI
        .format(path.extname(req.file.originalname).toString(), req.file.buffer)

      cloudinary.uploader.upload(image.content)
        .then((result) => User.findByPk({ where: { id } }))
        .then(user => res.status(200).json({ user }))
        .then((error) => res.status(500).json({ message: error.messege }))
    })
  }
}

export default new UserController()
