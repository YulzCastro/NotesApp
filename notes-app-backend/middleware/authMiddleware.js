// authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
