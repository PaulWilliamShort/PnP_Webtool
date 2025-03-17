const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const registerRoute = require('./routes/registry/register'); // Registrierungsroute einbinden
const loginRoute = require('./routes/login/login');
const characterRoute = require('./routes/characters/create');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json({limit: '50mb'}));  // JSON-Daten im Request verarbeiten
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(cors());

// Registrierung-Route einbinden
app.use('/api/auth/register', registerRoute);
app.use('/api/auth/login', loginRoute);
app.use('/api/characters', characterRoute);

// Server starten
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
