/* jshint indent: 2 */

const sequelizePaginate = require('sequelize-paginate')

module.exports = function(sequelize, DataTypes) {
  const model = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'product'
  });

  model.associate = (models) => {
    model.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  };
  
  sequelizePaginate.paginate(model);
  return model;
};
