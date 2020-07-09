'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS \`user\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`username\` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
      \`password\` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`idx_username\` (\`username\`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`product\`;`);
  }
};
