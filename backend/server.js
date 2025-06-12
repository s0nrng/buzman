const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
// Open your SQLite DB from public/database folder
const dbPath = path.resolve(__dirname, '../public/database/Customer.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open DB:', err.message);
  } else {
    console.log('Connected to SQLite DB');
  }
});

app.get('/customers/get', (req, res) => {
    const nameQuery = req.query.name || ''; // get the 'name' query param, default empty string
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 5;
    // Use parameterized query with LIKE for partial match
    const sql = `
      SELECT * FROM Customer
      WHERE Name LIKE ?
      ORDER BY Name ASC
      LIMIT ?
      OFFSET ?
    `;
  
    // Wrap the nameQuery with % for partial matching
    const param = `%${nameQuery}%`;
  
    db.all(sql, [param, limit, offset], (err, rows) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Backend server listening at http://192.168.0.112:${port}`);
  });