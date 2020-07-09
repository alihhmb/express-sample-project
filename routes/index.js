const {
  categoryController,
  productController,
  userController
} = require('../controllers');
const productRepository = require('../repository/productRepository');
const pagination = require('../middleware/pagination');
const auth = require('../middleware/auth');

module.exports = (app) => {
  app.post('/api/login', userController.login);
  app.get('/api/categories', pagination, categoryController.getCategories);
  app.get('/api/categories/:id(\\d+)', categoryController.getCategory);
  app.post('/api/categories', auth, categoryController.createCategory);
  app.put('/api/categories', auth, categoryController.updateCategory);
  app.delete('/api/categories/:id(\\d+)', auth, categoryController.deleteCategory);

  app.get('/api/products', pagination, productController.getProducts);
  app.get('/api/products/:id(\\d+)', productController.getProduct);
  app.post('/api/products', auth, productController.createProduct);
  app.put('/api/products', auth, productController.updateProduct);
  app.delete('/api/products/:id(\\d+)', auth, productController.deleteProduct);
  app.put(
    '/api/products/upload-image/:id(\\d+)', 
    auth,
    productRepository.productImageUpload.single('image'), 
    productController.updateProductImage
  );
};
