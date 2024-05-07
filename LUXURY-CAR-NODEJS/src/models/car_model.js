'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.Booking, { foreignKey: 'carId' })
      Car.belongsToMany(models.User, { through: 'Payment' }, { foreignKey: 'carId' })
    }
  };
  Car.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};