const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

console.log(`${__dirname}/swagger.yml`);

const swaggerDocument = YAML.load(`${__dirname}/swagger.yml`);
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
