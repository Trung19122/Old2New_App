const db = require('../config/db');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    return rows[0];
  },

  create: async (name, email, hashedPassword, phone) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );
    return result.insertId;
  },
};

module.exports = User;