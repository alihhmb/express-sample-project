'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {  
    return queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS \`category\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`idx_name\` (\`name\`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`category\`;`);
  }
};
