'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {  

    const transaction = await queryInterface.sequelize.transaction();
    try {

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

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
   
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`product_ibfk_1\`;`);
      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`product\`;`);
      await queryInterface.sequelize.query(`DROP TABLE IF EXISTS \`category\`;`);  
    } catch (err) {
      await transaction.rollback();
      throw err;
    }  
  }
};
