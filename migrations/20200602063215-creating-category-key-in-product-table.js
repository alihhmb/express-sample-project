'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE \`product\`
    ADD CONSTRAINT \`product_ibfk_1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\` (\`id\`);`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`product_ibfk_1\`;`);
  }
};
