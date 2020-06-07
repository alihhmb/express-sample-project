const Joi = require('@hapi/joi');
const _ = require('lodash');
const createError = require('http-errors')
const db = require('../models');
const categoryRepository = require('../repository/categoryRepository');

const validateProduct = async (product, edit = false) => {
  let idValidation = Joi.number().integer().min(1).optional();
  if (edit) {
    idValidation = idValidation.required();
  }

  const schema = Joi.object({
    id: idValidation,
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category_id: Joi
                .number()
                .integer()
                .required()
                .min(1)
                .external(async (value) => {
                  const category = await categoryRepository.getCategory(value);
                  if (!category) {
                    throw new createError.BadRequest('The category_id is not existing');
                  }
                  return value;
                }),
  });

  try {
   const v = await schema.validateAsync(product);   
  }catch(e) {
    throw e;
  }
}


const getProducts = async (params, page, pageSize) => {  
  const options = {
    page,
    paginate: pageSize,
    attributes: ['id', 'name', 'description', 'price'],
    include: [{
      model: db.category,
      as: 'category',
      required: true,
      attributes: ['id', 'name'],
    }],
    order: [
      ['name', 'ASC'],
    ]
  };

  if(params.category) {
    options.where = {
      category_id : params.category
    };
  }

  return await db.product.paginate(options);
};


const getProduct = async (id) => {
  const product = await db.product.findOne({
    attributes: ['id', 'name', 'description', 'price'],
    include: [{
      model: db.category,
      as: 'category',
      required: true,
      attributes: ['id', 'name'],
    }],
    where: {id},
  });
  return product;
};


const createProduct = async (product) => {
  product = _.pick(product, ['name', 'description', 'price', 'category_id']);
  try {
    await validateProduct(product);
    return db.product.create(product);
  } catch(e) {
    throw new createError.BadRequest(e.message);
  }
};


const updateProduct = async (product) => {
  product = _.pick(product, ['id', 'name', 'description', 'price', 'category_id']);
  try {
    await validateProduct(product, true);  
    const entity = await db.product.findOne({ where: { id: product.id } });
    if (!entity) {
      throw new createError.NotFound('Product not found');
    }
    return entity.update(product);
  } catch(e) {
    throw new createError.BadRequest(e.message);
  }
};


const deleteProduct = async (id) => {
  const product = await getProduct(id);
  if (product) {
    await db.product.destroy({ where: { id } });
    return product;
  }
  throw new createError.NotFound('Product not found');
};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

