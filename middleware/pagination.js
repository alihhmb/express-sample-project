const Joi = require('@hapi/joi');

module.exports = function (req, res, next) {
  const page = (req.query.page || '').trim();
  let invalidPage = false;
  if(page === '') {
    invalidPage = true;
  }else{
    const validation = Joi.number().integer().min(1).required().validate(page);
    if(validation.error) {
      invalidPage = true;  
    }
  }

  if(invalidPage) {
    req.query.page = 1;
  }else{
    req.query.page = parseInt(page);
  }
  
  next();
};
