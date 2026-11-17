const userService = require("./user.service");
const jwt = require("jsonwebtoken");
const { logger } = require("../../shared/logger/logger");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const UserController = {
  async register(req, res) {
    try {
      logger.info("Solicitando registro de usuário");
      const { nome, email, password } = req.body;

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const user = await userService.createUser({ nome, email, password });
      const token = generateToken(user.id);

      res.status(201).json({
        user: { id: user.id, email: user.email, nome: user.nome },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  },

  async login(req, res) {
    try {
      logger.info("Solicitando login de usuário");
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);
      if (!user || !user.validPassword(password)) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      const token = generateToken(user.id);
      res.status(201).json({
        user: { id: user.id, email: user.email, nome: user.nome },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },
};

module.exports = UserController;
