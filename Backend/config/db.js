// db.js
const sqlite3 = require('sqlite3').verbose();

// SQLite-Datenbank-Datei
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err.message);
  } else {
    console.log('Mit der SQLite-Datenbank verbunden.');
  }
});

// Erstelle die "users"-Tabelle, falls sie nicht existiert
db.serialize(() => {
  // Create user table
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, role TEXT)");
  
  // Create characters table
  db.run("CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, userID INTEGER, name TEXT, race TEXT, lifepoints INTEGER, FOREIGN KEY (userID) REFERENCES users(id))");

  //Create abilities table
  db.run("CREATE TABLE IF NOT EXISTS abilities (id INTEGER PRIMARY KEY AUTOINCREMENT, characterID INTEGER, abilityName TEXT, rank INTEGER, FOREIGN KEY (characterID) REFERENCES characters(id))");

  // Create inventory table 
  db.run("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, characterID INTEGER, itemName TEXT, quantity INTEGER, FOREIGN KEY (characterID) REFERENCES characters(id))");

  // Create stats table
  db.run("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, characterID INTEGER, StatName TEXT, rank INTEGER, FOREIGN KEY (characterID) REFERENCES characters(id))");

  // Create Handicap table
  db.run("CREATE TABLE IF NOT EXISTS handicaps (id INTEGER PRIMARY KEY AUTOINCREMENT, characterID INTEGER, handicapName TEXT, description TEXT, impact TEXT, FOREIGN KEY (characterID) REFERENCES characters(id))");
});

module.exports = db;  // Exportiere die SQLite-Datenbankverbindung
