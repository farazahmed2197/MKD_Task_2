//Auto Generated Sequelize Model

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../dbConnect')

class location extends Model {}

location.init({
id:{
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
},
name:{
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
    modelName: 'location',
});

module.exports = location;
