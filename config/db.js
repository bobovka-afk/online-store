const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  async function testConnection() {
    try{
        await sequelize.authenticate()
        console.log('Успешное подключение к базе данных')
    } catch (err) {
        console.log('Ошибка при подключении к базе данных', err)
        process.exit(1)
    }
  }

  testConnection()

  module.exports = sequelize