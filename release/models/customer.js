//Auto Generated Sequelize Model

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../dbConnect')

class customer extends Model {}

customer.init({
id:{
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
name:{
type: DataTypes.STRING,
allowNull: false,
},
email:{
type: DataTypes.STRING,
allowNull: false,
},
address:{
type: DataTypes.STRING,
allowNull: false,
},
status:{
type: DataTypes.INTEGER,
allowNull: false,
},
},
{
        sequelize,
        modelName: 'customer',
    });
module.exports = customer;
