const db = require('../config/db');

const Product = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT p.*, c.name AS category, u.name AS seller
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN users u      ON p.user_id = u.id
      WHERE p.status = 'available'
      ORDER BY p.created_at DESC
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT p.*, c.name AS category, u.name AS seller, u.phone
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN users u      ON p.user_id = u.id
      WHERE p.id = ?
    `, [id]);
    return rows[0];
  },

  getAllCategories: async () => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  },

  create: async (data) => {
    const [result] = await db.query(
      `INSERT INTO products 
        (user_id, category_id, title, description, price, condition_type, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.user_id, data.category_id, data.title, data.description,
       data.price, data.condition_type, data.image_url]
    );
    return result.insertId;
  },
};

module.exports = Product;