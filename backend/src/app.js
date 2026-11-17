const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
const app = express();
const userRoutes = require("./modules/users/user.routes");
const transacaoRoutes = require("./modules/controle-financeiro/transacao.routes");
const {httpLogger} = require("./shared/logger/logger");

app.use(cors());
app.use(express.json());
app.use(httpLogger);

require("./shared/database/models"); // Importa os modelos para garantir que os relacionamentos sejam aplicados

app.use("/api/users", userRoutes);
app.use("/api/transacoes", transacaoRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;