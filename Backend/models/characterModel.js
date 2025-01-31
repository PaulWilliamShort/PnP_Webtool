// models/characterModel.js
const db = require('../config/db');

const Character = {
  create: (user_id, name, race, className, xp, callback) => {
    const query = 'INSERT INTO characters (user_id, name, race, class, xp) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user_id, name, race, className, xp], callback);
  },

  findByUserId: (user_id, callback) => {
    const query = 'SELECT * FROM characters WHERE user_id = ?';
    db.query(query, [user_id], callback);
  },
};

module.exports = Character;
