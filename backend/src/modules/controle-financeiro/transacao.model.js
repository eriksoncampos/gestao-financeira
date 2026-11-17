const { DataTypes } = require("sequelize");
const sequelize = require("../../shared/database/connection");
const bcrypt = require("bcryptjs");

const Transacao = sequelize.define("Transacao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("entrada", "saida"),
    allowNull: false,
  },
  data_transacao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
},{
    tableName: "transacoes",
    timestamps: true,
    underscored: true,
});

module.exports = Transacao;