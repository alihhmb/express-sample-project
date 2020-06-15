const Sequelize = require('sequelize')
const createError = require('http-errors')
const categoryRepository = require('../repository/categoryRepository');

const awsConfig = require(__dirname + '/../config/config').AWS;

exports.getCategories = async (req, res) => {
  let currentPage = req.query.page;
  let { docs, pages, total }  = await categoryRepository.getCategories(currentPage, 5);
  if(req.page > pages) {
    const result = await categoryRepository.getCategories(pages, 5);
    docs = result.docs;
    pages = result.pages; 
    total = result.total;
    currentPage = pages;
  }
  res.status(200).send({
    bucket: awsConfig.bucket,
    docs, 
    page: currentPage,
    pages, 
    total
  });
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryRepository.getCategory(id);
  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send({
      message: 'Category not found',
    });
  }
};


exports.createCategory = async (req, res) => {
  try {
    const category = await categoryRepository.createCategory(req.body);
    res.status(200).send(category);
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


exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryRepository.updateCategory(req.body);
    res.status(200).send(category);
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
        message: e.message,
      });
    }
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryRepository.deleteCategory(id);
    res.status(200).send(category);
  } catch (e) {
    if (e instanceof createError.NotFound) {
      res.status(404).send({
        message: e.message,
      });
    } else if(e instanceof Sequelize.ForeignKeyConstraintError){
      res.status(403).send({
        message: 'The category contains related data',
      });
    } else {
        res.status(500).send({
          message: e.message,
        });
      }
  }
};
