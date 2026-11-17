// swagger.js
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "API - Gestão Financeira",
    description: "Documentação gerada automaticamente com swagger-autogen",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    // Você pode pré-definir modelos (schemas) aqui para reutilizar
    schemas: {
      Usuario: {
        nome: "Erikson",
        email: "erikson@gmail.com",
      },
      Transacao: {
        descricao: "Compra de produtos",
        valor: 100.0,
        data: "2023-01-01",
        tipo: "saida",
      }
    },
    security: [{ bearerAuth: [] }],
  },
};

const outputFile = "./swagger-output.json";
// IMPORTANTE: Passe o arquivo raiz onde as rotas são registradas (ex: app.js ou routes/index.js)
const routes = ["./src/app.js"];

swaggerAutogen(outputFile, routes, doc);
