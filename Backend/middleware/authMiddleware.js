const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Erwartet "Bearer <token>"

  if (!token) {
    console.error('❌ Kein Token bereitgestellt!');
    return res.status(403).json({ message: 'Kein Token bereitgestellt' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('❌ Ungültiges Token!', err.message);
      return res.status(403).json({ message: 'Ungültiges Token' });
    }

    console.log('✅ Token erfolgreich verifiziert:', user);
    req.user = user;  // User-Objekt speichern
    next();
  });
};

module.exports = authenticateJWT;
