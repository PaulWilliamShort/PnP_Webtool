// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../config/db');  // SQLite-Datenbankverbindung einbinden

// Benutzer registrieren
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Passwort mit bcrypt hashen
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Fehler beim Hashen des Passworts');
    }

    // Benutzer in der Datenbank speichern
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        return res.status(500).send('Fehler beim Speichern des Benutzers');
      }
      res.status(200).send('Benutzer erfolgreich registriert');
    });
  });
});

// Benutzer einloggen
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Benutzer in der Datenbank suchen
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).send('Datenbankfehler');
    }

    if (!row) {
      return res.status(400).send('Benutzer nicht gefunden');
    }

    // Passwort mit bcrypt vergleichen
    bcrypt.compare(password, row.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Fehler bei der Passwortüberprüfung');
      }

      if (!isMatch) {
        return res.status(400).send('Falsches Passwort');
      }

      res.status(200).send('Erfolgreich eingeloggt');
    });
  });
});

module.exports = router;
