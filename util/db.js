const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodeshop", "root", "helloworld", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
