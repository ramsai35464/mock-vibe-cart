const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

// GET /api/products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/cart
app.get('/api/cart', (req, res) => {
  const query = `
    SELECT c.id as cartId, c.productId, c.qty, p.name, p.price
    FROM cart c
    JOIN products p ON p.id = c.productId
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = rows.reduce((sum, item) => sum + item.price * item.qty, 0);
    res.json({ items: rows, total });
  });
});

// POST /api/cart -> add/update
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

  db.get('SELECT * FROM cart WHERE productId = ?', [productId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) {
      db.run('UPDATE cart SET qty = ? WHERE productId = ?', [qty, productId], function (err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ success: true, updated: true });
      });
    } else {
      const createdAt = new Date().toISOString();
      db.run('INSERT INTO cart (productId, qty, createdAt) VALUES (?, ?, ?)', [productId, qty, createdAt], function (err3) {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ success: true, id: this.lastID });
      });
    }
  });
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', (req, res) => {
  db.run('DELETE FROM cart WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, deletedRows: this.changes });
  });
});

// POST /api/checkout
app.post('/api/checkout', (req, res) => {
  db.all(`
    SELECT c.id as cartId, c.productId, c.qty, p.name, p.price
    FROM cart c JOIN products p ON p.id = c.productId
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = rows.reduce((s, r) => s + r.price * r.qty, 0);
    const receipt = {
      receiptId: 'RCPT-' + Date.now(),
      total,
      items: rows,
      timestamp: new Date().toISOString()
    };
    db.run('DELETE FROM cart', [], () => {});
    res.json({ success: true, receipt });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
