const sqlite3 = require('sqlite3').verbose();

// Verbindung zur Datenbank herstellen
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('❌ Fehler beim Verbinden zur Datenbank:', err.message);
    } else {
        console.log('✅ Mit der SQLite-Datenbank verbunden.');
    }
});

// Funktion zum Ausführen von SQL-Befehlen
function runSQL(query, params = []) {
    db.run(query, params, function (err) {
        if (err) {
            console.error('❌ Fehler beim Ausführen des Befehls:', err.message);
        } else {
            console.log('✅ Erfolg! Betroffene Zeilen:', this.changes);
        }
    });
}

// Funktion zum Anzeigen von Daten
function getSQL(query, params = []) {
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('❌ Fehler beim Abrufen der Daten:', err.message);
        } else {
            console.log('🔍 Ergebnisse:', rows);
        }
    });
}

// Überprüfe, ob ein Befehl als Argument übergeben wurde
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('⚠️  Bitte gib einen SQL-Befehl ein.');
    process.exit(1);
}

// SQL-Befehl ausführen
const command = args.join(' ');
if (command.toLowerCase().startsWith('select')) {
    getSQL(command);
} else {
    runSQL(command);
}

// Verbindung schließen nach 1 Sekunde, um asynchrone Queries zuzulassen
setTimeout(() => db.close(() => console.log('✅ Verbindung zur Datenbank geschlossen.')), 1000);
