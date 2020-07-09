const Joi = require('@hapi/joi');
const db = require('../models');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/config').jwt;
const createError = require('http-errors')
const bcrypt = require('bcrypt');


function validate(loginObject) {
  const schema = Joi.object({
    username: Joi.string().min(1).max(200).required(),
    password: Joi.string().min(3).max(200).required(),
  });
  return schema.validate(loginObject);
}


exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await db.user.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.status(400).send('Invalid credentials.');
  }
  
  validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) {
    return res.status(400).send('Invalid credentials.');
  }

  const token = jwt.sign({ 
    id: user.id,
    username: user.username 
  }, jwtPrivateKey);

  return res.send({
    token
  });
};
