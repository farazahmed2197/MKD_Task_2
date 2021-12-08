//Auto Generated Sequelize Model

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../dbConnect')

class user extends Model {}

user.init({
id:{
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
},
name:{
type: DataTypes.STRING,
allowNull: false,
},
email:{
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
        modelName: 'user',
    });
module.exports = user;
