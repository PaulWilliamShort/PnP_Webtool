// models/userModel.js
const db = require('../config/db');

const User = {
  create: (username, password_hash, email, callback) => {
    const query = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
    db.query(query, [username, password_hash, email], callback);
  },

  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },
};

module.exports = User;
