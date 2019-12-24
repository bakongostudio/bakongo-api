const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', function(err, user, info) {
    if (!user)
      return res
        .status(401)
        .json({ message: 'Unauthorized Access, no Token Provided!' });

    req.user = user;

    next();
  })(req, res, next);
};
