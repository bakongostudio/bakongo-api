import JwtStrategy from ('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../models';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => {
          return done(err, false, { message: 'Server Error' });
        });
    })
  );
};
