const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Open your SQLite DB from public/database folder
const dbPath = path.resolve(__dirname, '../public/database/Business.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open DB:', err.message);
  } else {
    console.log('Connected to SQLite DB');
  }
});

app.post('/api/generate-invoice-customer', (req, res) => {
    const { products, selectedOrder, customer } = req.body;

    if (!products || !selectedOrder || !customer) {
        return res.status(500).json({ error: 'Missing data' });
    }

    const estimatedHeight = 400 + products.length * 20;

    const doc = new PDFDocument({
        size: [470, estimatedHeight]
    });

    const filePath = path.join(__dirname, `invoice-${selectedOrder.Id || 'unknown'}.pdf`);
    const writeStream = fs.createWriteStream(filePath);

    // ✅ Register and use a Unicode-safe font (like Roboto)
    const regularFont = path.join(__dirname, 'fonts', 'Roboto-Regular.ttf');
    const boldFont = path.join(__dirname, 'fonts', 'Roboto-Bold.ttf');

    doc.registerFont('Roboto', regularFont);
    doc.registerFont('Roboto-Bold', boldFont);
    doc.font('Roboto');

    doc.pipe(writeStream);

    // ✅ Header
    doc.font('Roboto-Bold').fontSize(20).text('Thông tin đơn hàng', { align: 'center' });

    doc.moveDown();
    doc.fontSize(10)
    doc.font('Roboto-Bold').text(`Mã đơn hàng: `, 40, undefined, {continued: true});
    doc.font('Roboto').text(`${selectedOrder.Id}`);
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Ngày lên đơn: `, options={continued: true});
    doc.font('Roboto').text(`${selectedOrder.Date}`)
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Khách hàng: `, options={continued: true});
    doc.font('Roboto').text(`${customer.Name}`)
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Số điện thoại: `, options={continued: true});
    doc.font('Roboto').text(`${selectedOrder.Phone}`)
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Địa chỉ: `, options={continued: true});
    doc.font('Roboto').text(`${selectedOrder.Address}`)
    doc.moveDown();

    // ✅ Table Header
    const headerY = doc.y;
    doc.font('Roboto-Bold')
       .text('#', 30, headerY)
       .text('Sản phẩm', 50, headerY)
       .text('Giá / Đơn vị', 200, headerY, { width: 100, align: 'center' })
       .text('YC', 300, headerY, { width: 30, align: 'center' })
       .text('TC', 330, headerY, { width: 30, align: 'center' })
       .text('Thành tiền', 360, headerY, { width: 100, align: 'center' });
    doc.moveDown(0.5);

    // Product rows
    let y = doc.y;
    let total = 0;
    doc.font('Roboto')
    
    // Make sure font and size are set
    doc.font('Roboto').fontSize(10);

    products.forEach((product, index) => {
        const lineTotal = +product.PricePerUnit * +product.NumUnit;
        total += lineTotal;
    
        const options = {
            name: { width: 140, align: 'left', lineBreak: true },
            price: { width: 100, align: 'center', lineBreak: true },
            yc: { width: 30, align: 'center', lineBreak: true },
            tc: { width: 30, align: 'center', lineBreak: true },
            total: { width: 100, align: 'center', lineBreak: true }
        };
    
        const nameHeight = doc.heightOfString(product.ProductName, options.name);
        const priceHeight = doc.heightOfString(`${product.PricePerUnit} / ${product.Unit}`, options.price);
        const ycHeight = doc.heightOfString(`${product.NumUnitRequested}`, options.yc);
        const tcHeight = doc.heightOfString(`${product.NumUnit}`, options.tc);
        const totalHeight = doc.heightOfString(`${lineTotal.toLocaleString('vi-VN')}`, options.total);
    
        const rowHeight = Math.max(nameHeight, priceHeight, ycHeight, tcHeight, totalHeight);
    
        doc.text(`${index + 1}`, 30, y);
        doc.text(product.ProductName, 50, y, options.name);
        doc.text(`${product.PricePerUnit} / ${product.Unit}`, 200, y, options.price);
        doc.text(`${product.NumUnitRequested}`, 300, y, options.yc);
        doc.text(`${product.NumUnit}`, 330, y, options.tc);
        doc.text(`${lineTotal.toLocaleString('vi-VN')}`, 360, y, options.total);
    
        y += rowHeight + 4;
    });
    // ✅ Total Row
    doc.font('Roboto-Bold')
    doc.moveDown(2);
    doc.fontSize(10).text('Tổng cộng:', 300, y, { width: 60, align: 'center' });
    doc.text(total.toLocaleString('vi-VN'), 360, y, { width: 100, align: 'center' });

    doc.end();

    // Finish PDF stream and send file
    writeStream.on('finish', () => {
        res.download(filePath, `invoice-${selectedOrder.Id || 'unknown'}.pdf`, () => {
            fs.unlinkSync(filePath); // Clean up
        });
    });

    writeStream.on('error', (err) => {
        console.error('Write error:', err.message);
        res.status(500).json({ error: 'PDF generation failed' });
    });
});

app.post('/api/generate-invoice-for-package', (req, res) => {
    const { products, selectedOrder, customer } = req.body;

    if (!products || !selectedOrder || !customer) {
        return res.status(500).json({ error: 'Missing data' });
    }

    const estimatedHeight = 400 + products.length * 20;

    const doc = new PDFDocument({
        size: [470, estimatedHeight],
        margin: 40
    });

    const fileName = `invoice-${selectedOrder.Id || 'unknown'}.pdf`;
    const filePath = path.join(__dirname, fileName);
    const writeStream = fs.createWriteStream(filePath);

    // Register fonts
    const regularFont = path.join(__dirname, 'fonts', 'Roboto-Regular.ttf');
    const boldFont = path.join(__dirname, 'fonts', 'Roboto-Bold.ttf');
    doc.registerFont('Roboto', regularFont);
    doc.registerFont('Roboto-Bold', boldFont);
    doc.font('Roboto');

    doc.pipe(writeStream);

    // Header
    doc.font('Roboto-Bold').fontSize(20).text('Thông tin đơn hàng', { align: 'center' });

    doc.moveDown();
    doc.fontSize(10);
    doc.font('Roboto-Bold').text(`Mã đơn hàng: `, 40, undefined, { continued: true });
    doc.font('Roboto').text(`${selectedOrder.Id}`);
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Ngày lên đơn: `, options={ continued: true });
    doc.font('Roboto').text(`${selectedOrder.Date}`);
    doc.moveDown(0.2);
    doc.font('Roboto-Bold').text(`Khách hàng: `, options={ continued: true });
    doc.font('Roboto').text(`${customer.Name}`);
    doc.moveDown();

    // Table Header
    const headerY = doc.y;
    doc.font('Roboto-Bold')
        .text('#', 30, headerY)
        .text('Sản phẩm', 50, headerY)
        .text('Yêu cầu', 300, headerY, { width: 60, align: 'center' })
        .text('Thực có', 360, headerY, { width: 60, align: 'center' });
    doc.moveDown(0.5);

    // Product rows
    let y = doc.y;
    let total = 0;
    doc.font('Roboto').fontSize(10);

    products.forEach((product, index) => {
        const lineTotal = +product.PricePerUnit * +product.NumUnit;
        total += lineTotal;

        const options = {
            name: { width: 140, align: 'left', lineBreak: true },
            price: { width: 100, align: 'center', lineBreak: true },
            yc: { width: 60, align: 'center', lineBreak: true },
            tc: { width: 60, align: 'center', lineBreak: true }
        };

        const nameHeight = doc.heightOfString(product.ProductName, options.name);
        const priceHeight = doc.heightOfString(`${product.PricePerUnit} / ${product.Unit}`, options.price);
        const ycHeight = doc.heightOfString(`${product.NumUnitRequested}`, options.yc);
        const tcHeight = doc.heightOfString(`${product.NumUnit}`, options.tc);
        const totalHeight = doc.heightOfString(`${lineTotal.toLocaleString('vi-VN')}`, options.total);

        const rowHeight = Math.max(nameHeight, priceHeight, ycHeight, tcHeight, totalHeight);

        doc.text(`${index + 1}`, 30, y);
        doc.text(product.ProductName, 50, y, options.name);
        doc.text(`${product.NumUnitRequested}`, 300, y, options.yc);
        doc.text(``, 360, y, options.tc);

        y += rowHeight + 4;
    });

    doc.end();

    writeStream.on('finish', () => {
        res.download(filePath, fileName, err => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Failed to download file.');
            } else {
                // Optionally delete the file after download
                fs.unlink(filePath, () => {});
            }
        });
    });
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

app.post('/customers/create', (req, res) => {
    const { name, phone, address } = req.body;

    const trimmedName = name?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedAddress = address?.trim();

    if (!trimmedName || !trimmedPhone || !trimmedAddress) {
        return res.status(400).json({ error: 'Missing or empty required fields' });
    }

    const sql = `INSERT INTO Customer (Name, Phone, Address) VALUES (?, ?, ?)`;
    db.run(sql, [trimmedName, trimmedPhone, trimmedAddress], function (err) {
        if (err) {
            console.error('Query error:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Customer with this phone already exists' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ 
            message: 'Customer created successfully',
            customerId: this.lastID
        });
    });
});

app.post('/products/create', (req, res) => {
    let { name, pricePerUnit, unit } = req.body;

    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof unit !== 'string' || unit.trim() === '' ||
        pricePerUnit === undefined || isNaN(pricePerUnit)
    ) {
        return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    name = name.trim();
    unit = unit.trim();

    const sql = `INSERT INTO Product (Name, PricePerUnit, Unit) VALUES (?, ?, ?)`;
    db.run(sql, [name, pricePerUnit, unit], function (err) {
        if (err) {
            console.error('Query error:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Product already exists' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ 
            message: 'Product created successfully',
            productId: this.lastID
        });
    });
});

app.post('/products/update', (req, res) => {
    const { id, name, pricePerUnit, unit } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Missing or invalid product ID' });
    }

    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof unit !== 'string' || unit.trim() === '' ||
        pricePerUnit === undefined || isNaN(pricePerUnit)
    ) {
        return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    const trimmedName = name.trim();
    const trimmedUnit = unit.trim();

    const sql = `UPDATE Product SET Name = ?, PricePerUnit = ?, Unit = ? WHERE Id = ?`;
    db.run(sql, [trimmedName, pricePerUnit, trimmedUnit, id], function (err) {
        if (err) {
            console.error('Query error:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Product name already in use' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', productId: id });
    });
});


app.post('/customers/update', (req, res) => {
    const { id, name, phone, address } = req.body;

    const trimmedName = name?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedAddress = address?.trim();

    if (!id || !trimmedName || !trimmedPhone || !trimmedAddress) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const sql = `UPDATE Customer SET Name = ?, Phone = ?, Address = ? WHERE Id = ?`;
    db.run(sql, [trimmedName, trimmedPhone, trimmedAddress, id], function (err) {
        if (err) {
            console.error('Query error:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'Phone number already in use' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({ message: 'Customer updated successfully', customerId: id });
    });
});


app.get('/customers/get_desc', (req, res) => {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    // Use parameterized query with descending ID order
    const sql = `
      SELECT * FROM Customer
      ORDER BY Id DESC
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

app.get('/products/get_desc', (req, res) => {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const sql = `SELECT * FROM Product ORDER BY Id DESC LIMIT ? OFFSET ?`;
    
    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});     

app.get('/customers/get_by_id', (req, res) => {
    const id = parseInt(req.query.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid or missing id parameter' });
    }

    const sql = `SELECT * FROM Customer WHERE Id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Slice the customer object (e.g., exclude sensitive fields if needed)
        const { Id, Name, Phone, Address } = row; // adjust fields as needed
        res.json({ Id, Name, Phone, Address });
    });
});

app.post('/orders/update', (req, res) => {
    const order = req.body.order;
    const products = req.body.products;

    if (!order || !order.Id || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        // Step 1: Update OrderTable
        const updateOrderSQL = `
            UPDATE OrderTable
            SET Customer = ?, Date = ?, Condition = ?, Phone = ?, Address = ?
            WHERE Id = ?
        `;
        db.run(updateOrderSQL, [
            order.Customer,
            order.Date,
            order.Condition,
            order.Phone,
            order.Address,
            order.Id
        ], function (err) {
            if (err) {
                console.error('Failed to update order:', err.message);
                db.run('ROLLBACK');
                return res.status(500).json({ error: 'Failed to update order' });
            }

            // Step 2: Delete existing OrderHistory entries
            const deleteHistorySQL = `DELETE FROM OrderHistory WHERE OrderId = ?`;
            db.run(deleteHistorySQL, [order.Id], function (err) {
                if (err) {
                    console.error('Failed to clear order history:', err.message);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Failed to clear old products' });
                }

                // Step 3: Insert new products into OrderHistory
                const insertSQL = `
                    INSERT INTO OrderHistory (NumUnitRequested, NumUnit, OrderId, ProductId)
                    VALUES (?, ?, ?, ?)
                `;
                const stmt = db.prepare(insertSQL);

                let insertErrors = false;

                for (const product of products) {
                    stmt.run([
                        product.NumUnitRequested,
                        product.NumUnit,
                        order.Id,
                        product.ProductId
                    ], function (err) {
                        if (err) {
                            insertErrors = true;
                            console.error('Insert error:', err.message);
                        }
                    });
                }

                stmt.finalize((err) => {
                    if (err || insertErrors) {
                        db.run('ROLLBACK');
                        return res.status(500).json({ error: 'Failed to insert new products' });
                    }

                    db.run('COMMIT', (err) => {
                        if (err) {
                            console.error('Commit error:', err.message);
                            return res.status(500).json({ error: 'Transaction commit failed' });
                        }
                        res.json({ message: 'Order updated successfully' });
                    });
                });
            });
        });
    });
});

app.post('/orders/cancel', (req, res) => {
    const order = req.body.order;

    if (!order || !order.Id) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const orderId = order.Id;

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const updateOrderSQL = `
            UPDATE OrderTable
            SET Condition = 'đã huỷ'
            WHERE Id = ?
        `;

        db.run(updateOrderSQL, [orderId], function (err) {
            if (err) {
                console.error('Failed to cancel order:', err.message);
                db.run('ROLLBACK');
                return res.status(500).json({ error: 'Failed to cancel order' });
            }

            // ✅ COMMIT after successful update
            db.run('COMMIT', (commitErr) => {
                if (commitErr) {
                    console.error('Commit failed:', commitErr.message);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Failed to commit transaction' });
                }

                res.json({ message: 'Order canceled successfully' });
            });
        });
    });
});



app.get('/orders/products_by_order', (req, res) => {
    const orderId = parseInt(req.query.orderId, 10);

    if (isNaN(orderId)) {
        return res.status(400).json({ error: 'Invalid or missing orderId' });
    }

    const sql = `
      SELECT 
        Product.Id AS ProductId,
        Product.Name AS ProductName,
        Product.PricePerUnit,
        Product.Unit,
        OrderHistory.NumUnitRequested,
        OrderHistory.NumUnit
      FROM OrderHistory
      JOIN Product ON OrderHistory.ProductId = Product.Id
      WHERE OrderHistory.OrderId = ?
    `;

    db.all(sql, [orderId], (err, rows) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(rows);
    });
});


app.get('/orders/get', (req, res) => {
    const indexQuery = req.query.index || '';
    const conditionQuery = req.query.condition || ''; // New condition param
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;

    // Base SQL
    let sql = `
      SELECT * FROM OrderTable
      WHERE Id LIKE ?
    `;

    const params = [`%${indexQuery}%`];

    // Add condition filter only if provided
    if (conditionQuery) {
        sql += ` AND Condition = ?`;
        params.push(conditionQuery);
    }

    sql += `
      ORDER BY Id ASC
      LIMIT ?
      OFFSET ?
    `;

    params.push(limit, offset);

    db.all(sql, params, (err, rows) => {
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
                        `INSERT INTO OrderHistory (NumUnitRequested, NumUnit, OrderId, ProductId)
                         VALUES (?, ?, ?, ?)`,
                        [item.NoUnit, item.NoUnit, orderId, item.ProductId],
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