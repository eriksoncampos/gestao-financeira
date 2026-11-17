require("dotenv").config();
const app = require("./app");
const sequelize = require("./shared/database/connection");

// Inicialização segura do Banco de Dados e do Servidor
async function startServer() {
  try {
    // 1. Testa se as credenciais estão certas
    await sequelize.authenticate();
    console.log("Conexão com o PostgreSQL estabelecida com sucesso!");

    // 2. Inicia o servidor apenas após o banco estar pronto
    const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Erro crítico ao iniciar o servidor:", error);
    process.exit(1); // Fecha a aplicação caso não consiga conectar ao banco
  }
}

startServer();
