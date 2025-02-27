// models/characterModel.js
const db = require('../config/db');

const Session = {
  create: (session_id, name, race, className, xp, callback) => {
    const query = 'INSERT INTO sessions (session_id, session_name) VALUES (?, ?)';
    db.query(query, [session_id, session_name], callback);
  },

  findBySessionId: (session_id, callback) => {
    const query = 'SELECT * FROM sessions WHERE session_id = ?';
    db.query(query, [session_id], callback);
  },
};

module.exports = Session;
