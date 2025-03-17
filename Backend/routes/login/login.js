const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'meinGeheimesJWTToken';

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log('📌 Login-Anfrage erhalten für Benutzer:', username);

    const query = 'SELECT U_ID AS id, username, password FROM users WHERE username = ?';

    db.get(query, [username], async (err, user) => {
        if (err) {
            console.error('❌ Datenbankfehler:', err.message);
            return res.status(500).json({ message: 'Serverfehler, mit Verbindung der Datenbank', err });
        }

        if (!user) {
            console.warn('⚠️ Benutzer nicht gefunden:', username);
            return res.status(401).json({ message: 'Benutzer nicht gefunden' });
        }

        console.log('✅ Benutzer gefunden:', user);

        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error('❌ Fehler beim Passwortvergleich:', err.message);
                return res.status(500).json({ message: 'Fehler beim Vergleichen der Passwörter', err });
            }

            if (isMatch) {
                console.log('✅ Passwort stimmt überein!');

                // Prüfe, ob `user.id` wirklich existiert
                if (!user.id) {
                    console.error('❌ Fehler: user.id ist undefined!');
                    return res.status(500).json({ message: 'Fehler: Benutzer-ID fehlt!' });
                }

                const token = jwt.sign(
                    { id: user.id, username: user.username },
                    SECRET_KEY,
                    { expiresIn: '24h' }
                );

                console.log('✅ Token generiert:', token);
                res.json({ message: 'Login erfolgreich', token });
            } else {
                console.warn('⚠️ Ungültiges Passwort für Benutzer:', username);
                res.status(401).json({ message: 'Ungültige Anmeldedaten' });
            }
        });
    });
});

module.exports = router;
