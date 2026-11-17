const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/shared/database/connection");
const User = require("../src/modules/users/user.model");
const Transacao = require("../src/modules/controle-financeiro/transacao.model");

describe("Transações API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Cria as tabelas no banco de dados de teste
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
    await Transacao.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados após os testes
  });

  it("Deve criar uma nova transação", async () => {
    // Cria um usuário para associar à transação
    const user = await User.create({
      nome: "Teste",
      email: "teste@example.com",
      senha: "123456",
    });

    const response = await request(app)
      .post("/transacoes")
      .set("Authorization", `Bearer ${user.id}`) // Simula autenticação
      .send({
        descricao: "Salário",
        valor: 5000,
        tipo: "entrada",
        data_transacao: "2024-06-01",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.descricao).toBe("Salário");
  });
});
