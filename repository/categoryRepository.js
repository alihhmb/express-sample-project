const Joi = require('@hapi/joi');
const _ = require('lodash');
const createError = require('http-errors')
const db = require('../models');


function validateCategory(category, edit = false) {
  let idValidation = Joi.number().integer().min(1).optional();
  if (edit) {
    idValidation = idValidation.required();
  }
  const schema = Joi.object({
    id: idValidation,
    name: Joi.string().required(),   
  });

  return schema.validate(category);
}


const getCategories = async (page, pageSize) => {  
  return await db.category.paginate({
    page,
    paginate: pageSize,
    order: [
      ['name', 'ASC'],
    ] 
  });
};


const getCategory = async (id) => {
  const category = await db.category.findOne({
    attributes: ['id', 'name'],
    where: {id},
  });
  return category;
};


const createCategory = async (category) => {
  category = _.omit(category, ['id']);
  const validation = validateCategory(category);
  if (validation.error) {
    throw new createError.BadRequest(validation.error.details[0].message);
  } else {
    return db.category.create({
      name: category.name,
    });
  }
};


const updateCategory = async (category) => {
  const validation = validateCategory(category, true);
  if (validation.error) {
    throw new createError.BadRequest(validation.error.details[0].message);
  } else {
    const entity = await db.category.findOne({ where: { id: category.id } });
    if (!entity) {
      throw new createError.NotFound('Category not found');
    }
    category = _.omit(category, ['id']);
    return entity.update(category);
  }
};


const deleteCategory = async (id) => {
  const category = await db.category.findOne({ where: { id } });
  if (category) {
    await db.category.destroy({ where: { id } });
    return category;
  }
  throw new createError.NotFound('Category not found');
};


module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

