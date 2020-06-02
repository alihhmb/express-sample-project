'use strict';

const faker = require('faker');
const db = require('../models');

const addCategories = async (queryInterface, Sequelize) => {
  const transaction = await queryInterface.sequelize.transaction();
      try {

        const categories = [];
        for(let i=1; i <= 10; i++) {
          categories.push({
            name: faker.commerce.department()
          });
        }

        queryInterface.bulkInsert('category', categories, {});

        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
};


const addProducts = async (queryInterface, Sequelize) => {
  const categories = await db.category.findAll({
    attributes: ['id', 'name']
  });

  for(const category of categories) {

    const transaction = await queryInterface.sequelize.transaction();
    try {
      const products = [];
      for(let i=1; i <= 50; i++) {
        products.push({
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          price: faker.commerce.price(),
          category_id: category.id,
        });
      }
      queryInterface.bulkInsert('product', products, {});

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }         
  }    
};


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await addCategories(queryInterface, Sequelize);
    await addProducts(queryInterface, Sequelize);
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.bulkDelete('product', null, {});
      queryInterface.bulkDelete('category', null, {});
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
