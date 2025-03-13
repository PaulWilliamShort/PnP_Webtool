const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');  // Verbindung zur SQLite-Datenbank
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Registrierung
router.post('/', async (req, res) => {
    const { email, password, username, role, verificationToken } = req.body;

    // Überprüfung, ob alle Felder ausgefüllt sind
    if (!email || !password || !username || !role || !verificationToken) {
        return res.status(400).json({ error: 'Alle Felder sind erforderlich!' });
    }

    // Verifikationstoken überprüfen (aus .env Datei)
    if (verificationToken !== process.env.VERIFICATION_TOKEN) {
        return res.status(403).json({ error: 'Ungültiger Verifizierungstoken!' });
    }

    try {
        // Prüfen, ob der Benutzer bereits existiert
        db.get(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username], async (err, user) => {
            if (user) {
                return res.status(400).json({ error: 'Benutzer existiert bereits!' });
            }

            // Passwort sicher hashen
            const hashedPassword = await bcrypt.hash(password, 10);

            // Benutzer in die Datenbank speichern
            db.run(
                `INSERT INTO users (Email, Password, Username, Role) VALUES (?, ?, ?, ?)`,
                [email, hashedPassword, username, role],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Fehler beim Erstellen des Benutzers' });
                    }
                    res.status(201).json({ message: 'Benutzer erfolgreich registriert!', userId: this.lastID });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler!' });
    }
});

module.exports = router;
