const { DataTypes, Model } = require('sequelize');
const sequelize = require("../dbConnect");

class Product extends Model {}

Product.init({
  // Model attributes are defined here
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  image: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Product' // We need to choose the model name
});

module.exports = Product;