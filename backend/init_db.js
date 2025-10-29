const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_PATH = path.join(__dirname, 'db.sqlite');

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  // Drop existing tables (safe for re-init)
  db.run(`DROP TABLE IF EXISTS cart`);
  db.run(`DROP TABLE IF EXISTS products`);

  // Create products table
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  // Create cart table
  db.run(`
    CREATE TABLE cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL,
      createdAt TEXT,
      FOREIGN KEY(productId) REFERENCES products(id)
    )
  `);

  // Insert mock products
  const insert = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  const seed = [
    ["Green T-Shirt", 399],
    ["Notebook", 79],
    ["Water Bottle", 249],
    ["Earbuds", 1299],
    ["Coffee Mug", 199],
    ["Laptop Sleeve", 899]
  ];
  seed.forEach(item => insert.run(item[0], item[1]));
  insert.finalize();

  console.log("Database initialized with sample products.");
});

db.close();
