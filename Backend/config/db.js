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

// Erstelle Tabellen gemäß der Spezifikation
db.serialize(() => {
  // User Table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    U_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(40) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Role VARCHAR(10) NOT NULL
  )`);

  // Characters Table
  db.run(`CREATE TABLE IF NOT EXISTS characters (
    Char_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) NOT NULL,
    Nickname VARCHAR(50) NOT NULL,
    Bennys TINYINT NOT NULL,
    health VARCHAR(30) NOT NULL,
    conviction VARCHAR(100) NOT NULL,
    movement_range VARCHAR(4) NOT NULL,
    Parade TINYINT NOT NULL,
    toughness TINYINT NOT NULL,
    exhaustion TINYINT NOT NULL,
    Konstitution TINYINT NOT NULL,
    Strength TINYINT NOT NULL,
    willpower TINYINT NOT NULL,
    intelligence TINYINT NOT NULL,
    dexterity TINYINT NOT NULL,
    ProfilePicture BLOB,
    U_ID INTEGER NOT NULL,
    FOREIGN KEY (U_ID) REFERENCES users(U_ID)
  )`);

  // Inventory Table
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    Item_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Item VARCHAR(50) NOT NULL,
    Notes TEXT,
    Name VARCHAR(40) NOT NULL
  )`);

  // Character Inventory Table
  db.run(`CREATE TABLE IF NOT EXISTS character_inventory (
    Char_Inventory_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Item_ID INTEGER NOT NULL,
    Char_ID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (Item_ID) REFERENCES inventory(Item_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Talents Table
  db.run(`CREATE TABLE IF NOT EXISTS talents (
    Talent_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) NOT NULL
  )`);

  // Character Talents Table
  db.run(`CREATE TABLE IF NOT EXISTS character_talents (
    Char_Talent_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Talent_ID INTEGER NOT NULL,
    Char_ID INTEGER NOT NULL,
    Value TINYINT NOT NULL,
    FOREIGN KEY (Talent_ID) REFERENCES talents(Talent_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Handicaps Table
  db.run(`CREATE TABLE IF NOT EXISTS handicaps (
    Handicap_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) NOT NULL
  )`);

  // Character Handicaps Table
  db.run(`CREATE TABLE IF NOT EXISTS character_handicaps (
    Char_Handicap_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Handicap_ID INTEGER NOT NULL,
    Char_ID INTEGER NOT NULL,
    Value TINYINT NOT NULL,
    FOREIGN KEY (Handicap_ID) REFERENCES handicaps(Handicap_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Weapons Table
  db.run(`CREATE TABLE IF NOT EXISTS weapons (
    Weapon_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) NOT NULL,
    range VARCHAR(30) NOT NULL,
    Firerate VARCHAR(20) NOT NULL,
    damage VARCHAR(20) NOT NULL,
    Armor_pen VARCHAR(20) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    Notes TEXT
  )`);

  // Character Weapons Table
  db.run(`CREATE TABLE IF NOT EXISTS character_weapons (
    Char_weapon_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Weapon_ID INTEGER NOT NULL,
    Char_ID INTEGER NOT NULL,
    FOREIGN KEY (Weapon_ID) REFERENCES weapons(Weapon_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Abilities Table
  db.run(`CREATE TABLE IF NOT EXISTS abilities (
    Ability_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(40) NOT NULL
  )`);

  // Character Abilities Table
  db.run(`CREATE TABLE IF NOT EXISTS character_abilities (
    Char_ability_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Char_ID INTEGER NOT NULL,
    Ability_ID INTEGER NOT NULL,
    Value TINYINT NOT NULL,
    FOREIGN KEY (Ability_ID) REFERENCES abilities(Ability_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Spells Table
  db.run(`CREATE TABLE IF NOT EXISTS spells (
    Spell_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) NOT NULL,
    range VARCHAR(20) NOT NULL,
    Duration VARCHAR(50) NOT NULL,
    Effect VARCHAR(100) NOT NULL,
    Magicpoints TINYINT NOT NULL
  )`);

  // Character Spells Table
  db.run(`CREATE TABLE IF NOT EXISTS character_spells (
    Char_Spell_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Char_ID INTEGER NOT NULL,
    Spell_ID INTEGER NOT NULL,
    Value TINYINT NOT NULL,
    FOREIGN KEY (Spell_ID) REFERENCES spells(Spell_ID),
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);

  // Poker Deck Table
  db.run(`CREATE TABLE IF NOT EXISTS poker_deck (
    card_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Value VARCHAR(20) NOT NULL,
    Symbol VARCHAR(1) NOT NULL,
    Char_ID INTEGER NOT NULL,
    FOREIGN KEY (Char_ID) REFERENCES characters(Char_ID)
  )`);
});

module.exports = db;  // Exportiere die SQLite-Datenbankverbindung
