const Transacao = require("./transacao.model");

const TransacaoService = {
  async createTransacao(transacaoData) {
    try {
      return await Transacao.create(transacaoData);
    } catch (error) {
      throw new Error("Erro ao criar transação");
    }
  },

  async getTransacaoById(id, user_id) {
    try {
      return await Transacao.findOne({ where: { id, user_id } });
    } catch (error) {
      throw new Error("Erro ao buscar transação");
    }
  },

  async getAllTransacoes(user_id) {
    try {
      return await Transacao.findAll({ where: { user_id } });
    } catch (error) {
      throw new Error("Erro ao buscar transações");
    }
  },

  async updateTransacao(id, transacaoData, user_id) {
    try {
      const transacao = await Transacao.findOne({ where: { id, user_id } });
      if (!transacao) {
        throw new Error("Transação não encontrada");
      }
      return await transacao.update(transacaoData);
    } catch (error) {
      throw new Error("Erro ao atualizar transação");
    }
  },

  async deleteTransacao(id, user_id) {
    try {
      const transacao = await Transacao.findOne({ where: { id, user_id } });
      if (!transacao) {
        throw new Error("Transação não encontrada");
      }
      return await transacao.destroy();
    } catch (error) {
      throw new Error("Erro ao excluir transação");
    }
  },
};

module.exports = TransacaoService;
