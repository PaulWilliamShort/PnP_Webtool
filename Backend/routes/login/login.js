const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const bcrypt = require('bcryptjs');


const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || 'meinGeheimesJWTToken';

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const query = 'SELECT username, password FROM users WHERE username = ?';

    db.get(query, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({message: 'Serverfehler, mit verbindung der Datenbank', err});
        }

        if (!user) {
            return res.status(401).json({message: 'Benutzer nicht gefunden'});
        }
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({message: 'Fehler beim Vergleichen der Passwörter', err});
            }

            if (isMatch) {
                const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '24h'});
                res.json({message: 'Login erfolgreich', token});
            } else {
                res.status(401).json({message: 'Ungültige Anmeldedaten'});
            }
        });
    });

});

module.exports = router;
