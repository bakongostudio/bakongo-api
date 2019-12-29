import { validationResult } from ('express-validator');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let error = {};
    result.array().map(err => (error[err.param] = err.msg)); //TODO checke this out after - https://express-validator.github.io/docs/validation-result-api.html#array-options
    return res.status(422).json({ error });
  }

  next();
};
