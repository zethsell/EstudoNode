const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('estudo_node', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;