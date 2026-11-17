const User = require("./user.model");

const UserService = {
  async createUser(userData) {
    try {
      console.log("Creating user with data:", userData);
      return await User.create(userData);
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  },

  async getUserById(id) {
    try {
      console.log("Fetching user with ID:", id);
      return await User.findByPk(id);
    } catch (error) {
      throw new Error("Erro ao buscar usuário");
    }
  },

  async getUserByEmail(email) {
    try {
      console.log("Fetching user with email:", email);
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error("Erro ao buscar usuário por email");
    }
  }
};

module.exports = UserService;
