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

/*// Erstelle die "users"-Tabelle, falls sie nicht existiert
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
});*/

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS User (
      U_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Passwort TEXT NOT NULL,
      mail TEXT,
      LastLogin DATETIME,
      SystemRole TEXT
  )`);
    console.log("created User Table");

  db.run(`CREATE TABLE IF NOT EXISTS Session (
      S_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Creator INTEGER NOT NULL,
      Gamemaster INTEGER NOT NULL,
      Started DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (Creator) REFERENCES User(U_ID)
      FOREIGN KEY (Gamemaster) REFERENCES User(U_ID)
  )`);
    console.log("created Session Table");

  db.run(`CREATE TABLE IF NOT EXISTS Characters (
      C_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      owner INTEGER NOT NULL,
      Session INTEGER NOT NULL,
      isFromGM BOOLEAN,
      MaxLP INTEGER,
      LP INTEGER,
      type TEXT,
      MaxMana INTEGER,
      Mana INTEGER,
      Notes TEXT,
      FOREIGN KEY (owner) REFERENCES User(U_ID),
      FOREIGN KEY (Session) REFERENCES Session(S_ID)
  )`);
    console.log("created Characters Table");

  db.run(`CREATE TABLE IF NOT EXISTS Items (
      I_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      creator INTEGER NOT NULL,
      dmg INTEGER,
      type TEXT,
      notes TEXT,
      FOREIGN KEY (creator) REFERENCES User(U_ID)
  )`);
  console.log("created Items Table");

  db.run(`CREATE TABLE IF NOT EXISTS Inventory (
      S_ID INTEGER NOT NULL,
      I_ID INTEGER NOT NULL,
      C_ID INTEGER NOT NULL,
      count INTEGER DEFAULT 1,
      PRIMARY KEY (S_ID, I_ID, C_ID),
      FOREIGN KEY (S_ID) REFERENCES Session(S_ID),
      FOREIGN KEY (I_ID) REFERENCES Items(I_ID),
      FOREIGN KEY (C_ID) REFERENCES Characters(C_ID)
  )`);
  console.log("created Inventory Table");
  
  db.run(`CREATE TABLE IF NOT EXISTS Handicaps (
      C_ID INTEGER NOT NULL,
      S_ID INTEGER NOT NULL,
      Name TEXT NOT NULL,
      Impact TEXT,
      description TEXT,
      PRIMARY KEY (C_ID, S_ID, Name),
      FOREIGN KEY (C_ID) REFERENCES Characters(C_ID),
      FOREIGN KEY (S_ID) REFERENCES Session(S_ID)
  )`);
  console.log("created Handicaps Table");

 
  //stats? 
});

db.close();


module.exports = db;  // Exportiere die SQLite-Datenbankverbindung
