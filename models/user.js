/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'user',
  });
};
