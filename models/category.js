/* jshint indent: 2 */

const sequelizePaginate = require('sequelize-paginate')

module.exports = function(sequelize, DataTypes) {
  const model = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'category'
  });

  sequelizePaginate.paginate(model);
  return model;
};
