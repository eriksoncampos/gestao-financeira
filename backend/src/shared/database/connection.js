// src/shared/database/connection.js
const { Sequelize } = require("sequelize");
require("dotenv").config({ quiet: true }); // Carrega variáveis de ambiente do arquivo .env

const env = process.env.NODE_ENV || "test"; // Define o ambiente (test, development, production)
const config = require("./config.js")[env]; // Caminho ajustado para sua pasta

// Instancia o banco usando a URL (produção) ou credenciais (local)
const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
