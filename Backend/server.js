// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Authentifizierungs-Routen importieren
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // JSON-Daten im Request verarbeiten

// Optional: Umgebungsvariablen laden (nur, wenn du eine .env Datei verwendest)
dotenv.config();

// Authentifizierungs-Routen einbinden
app.use('/api/auth', authRoutes);  // Beispiel: /api/auth/register und /api/auth/login

// Server starten
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
