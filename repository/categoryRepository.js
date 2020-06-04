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


exports.getCategories = async () => {
  let categories = await db.category.findAll({
    attributes: ['id', 'name'],  
    order: [
      ['name', 'ASC'],
    ]   
  });
  return categories;
};


exports.getCategory = async (id) => {
  const category = await db.category.findOne({
    attributes: ['id', 'name'],
    where: {id},
  });
  return category;
};


exports.createCategory = async (category) => {
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


exports.updateCategory = async (category) => {
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


exports.deleteCategory = async (id) => {
  const category = await db.category.findOne({ where: { id } });
  if (category) {
    await db.category.destroy({ where: { id } });
    return category;
  }
  throw new createError.NotFound('Category not found');
};
