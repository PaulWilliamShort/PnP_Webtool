const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const registerRoute = require('./routes/registry/register'); // Registrierungsroute einbinden
const loginRoute = require('./routes/login/login')

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // JSON-Daten im Request verarbeiten

// Registrierung-Route einbinden
app.use('/api/auth/register', registerRoute);
app.use('/api/auth/login', loginRoute);

// Server starten
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
