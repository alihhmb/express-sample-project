require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

console.log(process.env.NODE_ENV);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

if (process.env.NODE_ENV === 'development') {
  const swaggerDoc = require('./swagger/swaggerDoc');
  swaggerDoc(app);
}

module.exports = app;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sample Express Project is working ${port}! `);
});
