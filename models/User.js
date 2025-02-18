const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // уникальный
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    } ,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },  {
    tableName: 'users',
    timestamps: false
})  

module.exports = User
