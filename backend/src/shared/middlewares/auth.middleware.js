const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // #swagger.ignore = true
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acesso não autorizado" });
  }

  const token = authHeader.substring(7); // Remove "Bearer " from the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token nao autorizado, invalido" });
  }
};

module.exports = authMiddleware;
