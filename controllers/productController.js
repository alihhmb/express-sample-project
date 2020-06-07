const Sequelize = require('sequelize')
const createError = require('http-errors')
const Joi = require('@hapi/joi');
const productRepository = require('../repository/productRepository');


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
