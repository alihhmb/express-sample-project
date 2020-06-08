const {
  categoryController,
  productController,
} = require('../controllers');
const productRepository = require('../repository/productRepository');
const pagination = require('../middleware/pagination');

module.exports = (app) => {
  app.get('/api/categories', pagination, categoryController.getCategories);
  app.get('/api/categories/:id(\\d+)', categoryController.getCategory);
  app.post('/api/categories', categoryController.createCategory);
  app.put('/api/categories', categoryController.updateCategory);
  app.delete('/api/categories/:id(\\d+)', categoryController.deleteCategory);

  app.get('/api/products', pagination, productController.getProducts);
  app.get('/api/products/:id(\\d+)', productController.getProduct);
  app.post('/api/products', productController.createProduct);
  app.put('/api/products', productController.updateProduct);
  app.delete('/api/products/:id(\\d+)', productController.deleteProduct);
  app.put(
    '/api/products/upload-image/:id(\\d+)', 
    productRepository.productImageUpload.single('image'), 
    productController.updateProductImage
  );
};
