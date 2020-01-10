"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _passport = require('passport'); var _passport2 = _interopRequireDefault(_passport);

module.exports = (req, res, next) => {
  _passport2.default.authenticate('jwt', function (_err, user, info) {
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized Access, no Token Provided!' })
    }

    req.user = user

    next()
  })(req, res, next)
}
