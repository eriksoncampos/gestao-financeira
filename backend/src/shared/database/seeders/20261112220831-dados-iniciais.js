"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    // 1. Cria um usuário de teste com senha criptografada
    const senhaCriptografada = await bcrypt.hash("123456", 10);

    const [usuario] = await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Usuário Teste",
          email: "teste@email.com",
          password: senhaCriptografada,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: ["id"] }, // Retorna o ID gerado pelo PostgreSQL
    );

    // 2. Insere entradas e saídas vinculadas a esse usuário
    await queryInterface.bulkInsert("transacoes", [
      {
        user_id: usuario.id,
        descricao: "Salário Mensal",
        valor: 4500.0,
        tipo: "entrada",
        data_transacao: "2026-11-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usuario.id,
        descricao: "Supermercado",
        valor: 620.5,
        tipo: "saida",
        data_transacao: "2026-11-08",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usuario.id,
        descricao: "Conta de Energia",
        valor: 185.0,
        tipo: "saida",
        data_transacao: "2026-11-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    // Remove os dados na ordem inversa para não quebrar a chave estrangeira
    await queryInterface.bulkDelete("transacoes", null, {});
    await queryInterface.bulkDelete("users", { email: "teste@email.com" }, {});
  },
};
