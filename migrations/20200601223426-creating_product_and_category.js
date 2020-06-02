'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS \`category\` (
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`idx_name\` (\`name\`) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);

    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS \`product\` (
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
    
    await queryInterface.sequelize.query(`ALTER TABLE \`product\`
    ADD CONSTRAINT \`product_ibfk_1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\` (\`id\`);`);

    return queryInterface.sequelize.query(`SELECT 1`);
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.sequelize.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`product_ibfk_1\`;`);
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`product\`;`);
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`category\`;`);    
    return queryInterface.sequelize.query(`SELECT 1`);
  }
};
