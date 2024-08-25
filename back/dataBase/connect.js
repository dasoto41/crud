const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize("crud", "root", "daniela123", {
  dialect: "mysql",
  port: 3306,
});

module.exports = { sequelize };
