// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware, die überprüft, ob das JWT vorhanden und gültig ist
const authenticateJWT = (req, res, next) => {
  // Holen des Tokens aus dem Authorization-Header
  const token = req.header('Authorization')?.split(' ')[1];  // Erwartet "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Kein Token bereitgestellt' });
  }

  // Überprüfen des Tokens mit dem geheimen Schlüssel aus den Umgebungsvariablen
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Ungültiges Token' });
    }
    
    // Wenn das Token gültig ist, wird der Benutzer (User) zur Anfrage hinzugefügt
    req.user = user;  // Der Benutzer aus dem Token wird zu req.user hinzugefügt

    // Weiter zur nächsten Middleware oder zur Route
    next();
  });
};

module.exports = authenticateJWT;
