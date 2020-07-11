const Joi = require('@hapi/joi');
const db = require('../models');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/config').jwt;
const createError = require('http-errors');
const bcrypt = require('bcrypt');


function validate(loginObject) {
  const schema = Joi.object({
    username: Joi.string().min(1).max(200).required(),
    password: Joi.string().min(3).max(200).required(),
  });
  return schema.validate(loginObject);
}


exports.login = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      throw new createError.BadRequest(error.details[0].message);
    }
  
    const user = await db.user.findOne({ where: { username: req.body.username } });
    if (!user) {
      throw new createError.BadRequest('Invalid credentials.');
    }
    
    validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
      throw new createError.BadRequest('Invalid credentials.');
    }
  
    const token = jwt.sign({ 
      id: user.id,
      username: user.username 
    }, jwtPrivateKey);
  
    return res.send({
      token
    });
  }catch (e) {
    if(e instanceof createError.BadRequest) {
      res.status(400).send({
        message: e.message,
      });  
    }else{
      // log e.message
      res.status(500).send({
        message: 'Server Error'
      });
    }
  } 
};
