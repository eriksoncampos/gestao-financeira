const express = require("express");
const router = express.Router();
const transacaoController = require("./transacao.controller");
const authMiddleware = require("../../shared/middlewares/auth.middleware");

router.use(authMiddleware);

router
  .route("/")
  .get(transacaoController.getAllTransacoes)
  .post(transacaoController.createTransacao);

router
  .route("/:id")
  .get(transacaoController.getTransacaoById)
  .put(transacaoController.updateTransacao)
  .delete(transacaoController.deleteTransacao);

module.exports = router;