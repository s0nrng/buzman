const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Open your SQLite DB from public/database folder
const dbPath = path.resolve(__dirname, '../public/database/Business.db');

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

app.get('/orders/get', (req, res) => {
    const indexQuery = req.query.index || ''; 
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sql = `
      SELECT * FROM OrderTable
      WHERE Id LIKE ?
      ORDER BY Id ASC
      LIMIT ?
      OFFSET ?
    `;
  
    const param = `%${indexQuery}%`;
  
    db.all(sql, [param, limit, offset], (err, rows) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.get('/orders/get_top', (req, res) => {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;

    const sql = `
      SELECT * FROM OrderTable
      ORDER BY Date DESC
      LIMIT ?
      OFFSET ?
    `;

    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});


app.post('/orders/create', (req, res) => {
    const { customerId, address, phone, products } = req.body;

    if (!customerId || !address || !phone || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Missing or invalid input fields' });
    }

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const condition = 'đã lên';

        db.run(
            `INSERT INTO OrderTable (Customer, Date, Condition, Phone, Address)
             VALUES (?, ?, ?, ?, ?)`,
            [customerId, now, condition, phone, address],
            function (err) {
                if (err) {
                    console.error('Failed to insert order:', err.message);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Failed to create order' });
                }

                const orderId = this.lastID;
                let completed = 0;
                let failed = false;

                products.forEach((item) => {
                    if (!item.ProductId || !item.NoUnit) {
                        failed = true;
                        completed++;
                        return;
                    }

                    db.run(
                        `INSERT INTO OrderHistory (NumUnit, OrderId, ProductId)
                         VALUES (?, ?, ?)`,
                        [item.NoUnit, orderId, item.ProductId],
                        function (err) {
                            if (err) {
                                console.error('Failed to insert order history:', err.message);
                                failed = true;
                            }

                            completed++;

                            if (completed === products.length) {
                                if (failed) {
                                    db.run('ROLLBACK');
                                    return res.status(500).json({ error: 'Failed to insert all order items' });
                                }

                                db.run('COMMIT');
                                return res.json({ success: true, orderId });
                            }
                        }
                    );
                });
            }
        );
    });
});


app.get('/products/get', (req, res) => {
    const nameQuery = req.query.name || ''; // get the 'name' query param, default empty string
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 5;
    // Use parameterized query with LIKE for partial match
    const sql = `
      SELECT * FROM Product
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