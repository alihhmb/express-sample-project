/* jshint indent: 2 */

const sequelizePaginate = require('sequelize-paginate')
const fs = require('fs');

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
    tableName: 'product',
    hooks: {    
      afterDestroy: function(instance, options) {
        if(instance.image) {
          const currentImagePath = `uploads/${instance.image}`;
          if (fs.existsSync(currentImagePath)) {
            fs.unlinkSync(currentImagePath);
          }
        }
      }
    }
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
