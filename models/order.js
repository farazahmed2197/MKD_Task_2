const { DataTypes, Model } = require('sequelize');
const sequelize = require("../dbConnect");

class Order extends Model {}

Order.init({
  // Model attributes are defined here
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stripe_id: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  total: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Order' // We need to choose the model name
});

module.exports = Order;