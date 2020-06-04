const {
  categoryController,
} = require('../controllers');
const pagination = require('../middleware/pagination');

module.exports = (app) => {
  app.get('/api/categories', pagination, categoryController.getCategories);
  app.get('/api/categories/:id(\\d+)', categoryController.getCategory);
  app.post('/api/categories', categoryController.createCategory);
  app.put('/api/categories', categoryController.updateCategory);
  app.delete('/api/categories/:id(\\d+)', categoryController.deleteCategory);
};
