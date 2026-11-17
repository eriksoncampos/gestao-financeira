const User = require('../../modules/users/user.model');
const Transacao = require('../../modules/controle-financeiro/transacao.model');

// Definindo o relacionamento 1 para N (Um usuário tem várias transações)
User.hasMany(Transacao, {
  foreignKey: 'userId',
  as: 'transacoes',
  onDelete: 'CASCADE',
});

Transacao.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = { User, Transacao };
