const Sequelize = require('sequelize')
const createError = require('http-errors')
const fs = require('fs');
const Joi = require('@hapi/joi');
const productRepository = require('../repository/productRepository');
const fileTypeDetector = require('../lib/fileTypeDetector');


function getProductsParams(req) {
  const params = {
    category: null
  };
  if('category' in req.query) {
    if(Joi.number().integer().min(1).optional().validate(req.query.category).error) {
      throw new createError.BadRequest('Invalid Category ID Parameter');
    }else{
      params.category = req.query.category;
    }
  }
  return params;
}


exports.getProducts = async (req, res) => {
  try {
    let currentPage = req.query.page;
    const params = getProductsParams(req);
    let { docs, pages, total }  = await productRepository.getProducts(params, currentPage, 5);
    if(req.page > pages) {
      const result = await productRepository.getProducts(params, pages, 5);
      docs = result.docs;
      pages = result.pages; 
      total = result.total;
      currentPage = pages;
    }
    res.status(200).send({
      docs,
      page: currentPage,
      pages, 
      total
    });
  }catch(e) {
    if (e instanceof createError.BadRequest) {
      res.status(e.status).send({
        message: e.message,
      });
    } else {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productRepository.getProduct(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({
        message: 'Product not found',
      });
    }
  } catch (e) {
      res.status(500).send({
        message: 'Server Error',
      });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const product = await productRepository.createProduct(req.body);
    res.status(200).send(product);
  } catch (e) {
    if (e instanceof createError.BadRequest) {
      res.status(e.status).send({
        message: e.message,
      });
    } else {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await productRepository.updateProduct(req.body);
    res.status(200).send(product);
  } catch (e) {
    if (e instanceof createError.BadRequest) {
      res.status(e.status).send({
        message: e.message,
      });
    } else if (e instanceof createError.NotFound) {
      res.status(e.status).send({
        message: e.message,
      });
    } else {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productRepository.deleteProduct(id);
    res.status(200).send(product);
  } catch (e) {
    if (e instanceof createError.NotFound) {
      res.status(404).send({
        message: e.message,
      });
    } else if(e instanceof Sequelize.ForeignKeyConstraintError){
      res.status(403).send({
        message: 'The Product contains related data',
      });
    } else {
        res.status(500).send({
          message: 'Server Error',
        });
      }
  }
};


exports.updateProductImage = async (req, res) => {
  try {
    if (req.file) {
      let product = await productRepository.getProduct(req.params.id);
      if (!product) {
        throw new Error('Product not found');
      }
      const fileType = await fileTypeDetector.detectFromFile(req.file.path);
      if (fileType.ext === 'jpg') {
        if(product.image) {
          const currentImagePath = `uploads/${product.image}`;
          if (fs.existsSync(currentImagePath)) {
            fs.unlinkSync(currentImagePath);
          }
        }
        product = await productRepository.updateProductImage(
          req.params.id,
          req.file.filename,
        );
        res.status(200).send(product);
      } else {
        throw new Error('Invalid file format');
      }
    } else {
      throw new Error('No file uploaded');
    }
  } catch (e) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send({
      message: e.message,
    });
  }
};
