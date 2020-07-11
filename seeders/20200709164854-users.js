'use strict';

const db = require('../models');
const bcrypt = require('bcrypt');

const addUsers = async (queryInterface, Sequelize) => {
  const transaction = await queryInterface.sequelize.transaction();
      try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash('1234', salt)

        const users = [];
        users.push({
          username: 'admin',
          password: hashedPassword
        });
        
        queryInterface.bulkInsert('user', users, {});

        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
};



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await addUsers(queryInterface, Sequelize);
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.bulkDelete('user', null, {});
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
