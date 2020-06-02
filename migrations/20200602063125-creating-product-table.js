'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS \`product\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      \`description\` text COLLATE utf8mb4_unicode_ci,
      \`price\` decimal(10,2) NOT NULL,
      \`image\` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      \`category_id\` int(11) NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`idx_price\` (\`price\`) USING BTREE,
      KEY \`idx_category_id\` (\`category_id\`) USING BTREE,
      KEY \`idx_name\` (\`name\`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`product\`;`);
  }
};
