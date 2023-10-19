const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }
  const tokenArray = token.split(' ');
  if (tokenArray.length === 2 && tokenArray[0] === 'Bearer') {
    req.token = tokenArray[1];  // Extraer solo el token
  }
  console.log(req.token);
  jwt.verify(req.token, 'tu_secreto', (err, decoded) => {
    console.log(decoded);
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.userId = decoded.userId;
    next();
  });
};
