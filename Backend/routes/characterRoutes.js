// routes/characterRoutes.js
const express = require('express');
const db = require('../config/db');  // Datenbankverbindung
const authenticateJWT = require('../middleware/authMiddleware');  // Middleware zur Token-Überprüfung
const router = express.Router();

// Funktion, um Charaktere eines Benutzers aus der Datenbank zu holen
// Diese Funktion könnte als Model oder direkt hier definiert werden
function findByUserId(userId, callback) {
  db.all('SELECT * FROM characters WHERE userId = ?', [userId], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
}

// Funktion, um einen neuen Charakter zu erstellen
function create(userId, name, race, charClass, xp, callback) {
  db.run('INSERT INTO characters (userId, name, race, class, xp) VALUES (?, ?, ?, ?, ?)', 
         [userId, name, race, charClass, xp], 
         function(err) {
           if (err) {
             return callback(err);
           }
           callback(null, { id: this.lastID }); // Rückgabe der ID des neu erstellten Charakters
         });
}

// Charaktere eines Benutzers abrufen
router.get('/', authenticateJWT, (req, res) => {
  const userId = req.user.userId;  // UserID aus dem JWT

  findByUserId(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Fehler beim Abrufen der Charaktere' });
    }
    res.json(results);  // Charaktere zurückgeben
  });
});

// Neuen Charakter erstellen
router.post('/', authenticateJWT, (req, res) => {
  const userId = req.user.userId;  // UserID aus dem JWT
  const { name, race, class: charClass, xp } = req.body;  // Daten des Charakters aus dem Request-Body

  create(userId, name, race, charClass, xp, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Fehler beim Erstellen des Charakters' });
    }
    res.status(201).json({ message: 'Charakter erfolgreich erstellt', characterId: result.id });
  });
});

module.exports = router;
