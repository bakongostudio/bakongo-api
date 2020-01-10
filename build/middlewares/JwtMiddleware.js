"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _models = require('../models'); var _models2 = _interopRequireDefault(_models);

const JwtStrategy = require('passport-jwt').Strategy
ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      _models2.default.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user)
          return done(null, false)
        })
        .catch(err => {
          return done(err, false, { message: 'Server Error' })
        })
    })
  )
}
