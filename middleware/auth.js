const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Accès refusé, aucun token fourni');
  }

  try {
    const decoded = jwt.verify(token, 'votre_secret_jwt');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Token invalide');
  }
};

module.exports = authMiddleware;
