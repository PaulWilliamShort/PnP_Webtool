const express = require('express');
const db = require('../../config/db');
const authenticateJWT = require('../../middleware/authMiddleware');
const multer = require('multer'); // 📸 Datei-Upload Middleware

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // speichert bild im RAM

router.post('/create', authenticateJWT, upload.single('profilePicture'), (req, res) => {
    const { 
        name, nickname, bennys, health, conviction, exhaustion, abilities, handicaps, talents, spells, weapons 
    } = req.body;

    // Kampfwerte
    const movement_range = req.body.fightInfo?.movementRange || 0;
    const parade = req.body.fightInfo?.parry || 0;
    const toughness = req.body.fightInfo?.toughness || 0;

    // Attribute
    const konstitution = req.body.attributes?.constitution || 0;
    const strength = req.body.attributes?.strength || 0;
    const willpower = req.body.attributes?.willpower || 0;
    const intelligence = req.body.attributes?.intelligence || 0;
    const dexterity = req.body.attributes?.dexterity || 0;

    const userId = req.user.id; // ✅ User-ID aus Token
    console.log('🔍 User-ID aus Token:', userId);
    console.log('📌 Eingehende Daten:', req.body); 

    if (!name || !nickname) {
        console.error('❌ Fehler: Name oder Nickname fehlen!');
        return res.status(400).json({ error: 'Name und Nickname sind erforderlich!' });
    }
    // 📸 Profilbild speichern (falls hochgeladen)
    const profilePicture = req.file ? req.file.buffer : null; // 🚀 Hier wird das Bild als BLOB gespeichert

    // 📌 Prüfen, ob der Charaktername bereits existiert
    db.get(`SELECT Name FROM characters WHERE Name = ?`, [name], (err, existingCharacter) => {
        if (err) {
            console.error('❌ Fehler beim Überprüfen des Charakternamens:', err.message);
            return res.status(500).json({ error: 'Datenbankfehler beim Überprüfen des Charakternamens', details: err.message });
        }

        if (existingCharacter) {
            console.error('❌ Fehler: Charaktername existiert bereits!');
            return res.status(400).json({ error: 'Ein Charakter mit diesem Namen existiert bereits!' });
        }

        // 📌 Charakter mit allen Werten speichern
        const insertCharacterQuery = `
            INSERT INTO characters 
            (U_ID, Name, Nickname, Bennys, health, conviction, movement_range, 
            Parade, toughness, exhaustion, Konstitution, Strength, willpower, 
            intelligence, dexterity, profilePicture) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(insertCharacterQuery, [
            userId, name, nickname, bennys, health, conviction, movement_range, 
            parade, toughness, exhaustion, konstitution, strength, willpower, 
            intelligence, dexterity
        ], function (err) {
            if (err) {
                console.error('❌ Fehler beim Speichern des Charakters:', err.message);
                return res.status(500).json({ error: 'Fehler beim Speichern des Charakters', details: err.message });
            }

            const charId = this.lastID; // ✅ Die ID des neu erstellten Charakters
            console.log('✅ Charakter erfolgreich gespeichert, Char_ID:', charId);

            // 📌 Fähigkeiten speichern
            const insertAbilitiesQuery = `INSERT INTO character_abilities (Char_ID, Ability_ID, Value) VALUES (?, ?, ?)`;
            abilities?.forEach(ability => {
                db.get(`SELECT Ability_ID FROM abilities WHERE Name = ?`, [ability.name], (err, row) => {
                    if (!row) {
                        console.warn(`⚠️ Fähigkeit '${ability.name}' nicht gefunden!`);
                        return;
                    }
                    db.run(insertAbilitiesQuery, [charId, row.Ability_ID, ability.value]);
                });
            });

            // 📌 Handicaps speichern
            const insertHandicapsQuery = `INSERT INTO character_handicaps (Char_ID, Handicap_ID, Value) VALUES (?, ?, ?)`;
            handicaps?.forEach(handicap => {
                db.get(`SELECT Handicap_ID FROM handicaps WHERE Name = ?`, [handicap.name], (err, row) => {
                    if (!row) {
                        console.warn(`⚠️ Handicap '${handicap.name}' nicht gefunden!`);
                        return;
                    }
                    db.run(insertHandicapsQuery, [charId, row.Handicap_ID, handicap.value]);
                });
            });

            // 📌 Talente speichern
            const insertTalentsQuery = `INSERT INTO character_talents (Char_ID, Talent_ID, Value) VALUES (?, ?, ?)`;
            talents?.forEach(talent => {
                db.get(`SELECT Talent_ID FROM talents WHERE Name = ?`, [talent.name], (err, row) => {
                    if (!row) {
                        console.warn(`⚠️ Talent '${talent.name}' nicht gefunden!`);
                        return;
                    }
                    db.run(insertTalentsQuery, [charId, row.Talent_ID, talent.value]);
                });
            });

            // 📌 Zauber speichern
            const insertSpellsQuery = `INSERT INTO character_spells (Char_ID, Spell_ID, Value) VALUES (?, ?, ?)`;
            spells?.forEach(spell => {
                db.get(`SELECT Spell_ID FROM spells WHERE Name = ?`, [spell.name], (err, row) => {
                    if (!row) {
                        console.warn(`⚠️ Zauber '${spell.name}' nicht gefunden!`);
                        return;
                    }
                    db.run(insertSpellsQuery, [charId, row.Spell_ID, spell.magicPoints]);
                });
            });

            // 📌 Waffen speichern
            const insertWeaponsQuery = `INSERT INTO character_weapons (Char_ID, Weapon_ID) VALUES (?, ?)`;
            weapons?.forEach(weapon => {
                db.get(`SELECT Weapon_ID FROM weapons WHERE Name = ?`, [weapon.name], (err, row) => {
                    if (!row) {
                        console.warn(`⚠️ Waffe '${weapon.name}' nicht gefunden!`);
                        return;
                    }
                    db.run(insertWeaponsQuery, [charId, row.Weapon_ID]);
                });
            });

            res.status(201).json({ message: 'Charakter erfolgreich erstellt!', characterId: charId });
        });
    });
});

module.exports = router;
