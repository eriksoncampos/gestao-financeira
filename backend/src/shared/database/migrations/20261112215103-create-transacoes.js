"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transacoes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }, // Liga a transação ao dono dela
        onUpdate: "CASCADE",
        onDelete: "CASCADE", // Se o usuário for apagado, suas transações somem juntas
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2), // Evita erros de arredondamento com dinheiro
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("entrada", "saida"), // Aceita apenas esses dois valores
        allowNull: false,
      },
      data_transacao: {
        type: Sequelize.DATEONLY, // Guarda apenas a data (YYYY-MM-DD)
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("transacoes");
    // No PostgreSQL, tipos ENUM ficam salvos no banco mesmo após apagar a tabela
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_transacoes_tipo";',
    );
  },
};
