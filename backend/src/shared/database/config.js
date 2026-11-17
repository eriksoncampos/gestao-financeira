// src/shared/database/config.js
require("dotenv").config({ quiet: true }); // Carrega variáveis de ambiente do arquivo .env

const commonOptions = {
  dialect: process.env.DB_DIALECT || "postgres",
  define: {
    timestamps: true, // Cria created_at e updated_at automaticamente
    underscored: true, // Converte camelCase (userId) para snake_case (user_id) no banco
  },
};

module.exports = {
  test: {
    ...commonOptions,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  development: {
    ...commonOptions,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  production: {
    ...commonOptions,
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necessário na maioria dos provedores em nuvem (Render, Neon, etc.)
      },
    },
  },
};
