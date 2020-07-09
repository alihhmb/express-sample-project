/* eslint-disable consistent-return */
/* eslint-disable func-names */
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/config').jwt;

module.exports = function (req, res, next) {
  let token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
