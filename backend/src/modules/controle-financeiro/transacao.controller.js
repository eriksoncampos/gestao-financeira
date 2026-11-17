const transacaoService = require("./transacao.service");
const { logger } = require("../../shared/logger/logger");

const TransacaoController = {
  async createTransacao(req, res) {
    try {
      logger.info("Solicitando criação de transação");
      const { tipo, valor, descricao, data_transacao } = req.body;
      const transacao = await transacaoService.createTransacao({
        tipo,
        valor,
        descricao,
        data_transacao,
        user_id: req.user,
      });
      res.status(201).json(transacao);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar transação" });
    }
  },

  async getTransacaoById(req, res) {
    try {
      logger.info(`Solicitando transação com ID: ${req.params.id}`);
      const { id } = req.params;
      const transacao = await transacaoService.getTransacaoById(id, req.user);
      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      return res.status(200).json(transacao);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar transação" });
    }
  },

  async getAllTransacoes(req, res) {
    try {
      logger.info(`Solicitando todas as transações para o usuário: ${req.user}`);
      const transacoes = await transacaoService.getAllTransacoes(req.user);
      return res.status(200).json(transacoes);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar transações" });
    }
  },

  async updateTransacao(req, res) {
    try {

      const { id } = req.params;
      const { tipo, valor, descricao, data_transacao } = req.body;
      const transacao = await transacaoService.updateTransacao(id, { tipo, valor, descricao, data_transacao }, req.user);
      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      logger.info(`Transação atualizada com sucesso: ${transacao.id}`);
      res.status(200).json(transacao, { message: "Transação atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar transação" });
    }
  },

  async deleteTransacao(req, res) {
    try {
      logger.info(`Solicitando exclusão de transação com ID: ${req.params.id}`);
      const { id } = req.params;
      const transacao = await transacaoService.deleteTransacao(id, req.user);
      if (!transacao) {
        return res.status(404).json({ error: "Transação não encontrada" });
      }
      res.status(200).json(transacao, { message: "Transação excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir transação" });
    }
  }
};

module.exports = TransacaoController;
