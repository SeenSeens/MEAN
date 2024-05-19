const express = require('express');
const fs = require('fs');
const cors = require('cors');
const router = express.Router();

// Cấu hình Cors - Cho phép yêu cầu từ localhost:4200
const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 204,
    methods: "GET, POST, PUT, PATCH, DELETE",
};
// Use cors middleware
router.use(cors(corsOptions));
// Middleware để xử lý dữ liệu JSON
router.use(express.json());

// Đường dẫn đến file JSON
const dataFilePath = './data.json';
/**
 * Phần tài khoản
 */

/**
 * Phần sản phẩm
 */
// GET
router.get('/products', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const jsonData = JSON.parse(data);

        const productsData = jsonData.products;
        res.json(productsData);
    });
});
// POST - Thêm mới sản phẩm
router.post('/products', (req, res) => {
    const { name } = req.body;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const jsonData = JSON.parse(data);
        const maxId = jsonData.items.reduce(
            (max, item) => Math.max(max, item.id),
            0
        );
        const newProduct = req.body;
        jsonData.products.push(newProduct);
        fs.writeFile(dataFilePath, JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ message: 'Product added successfully' });
        });
    });
});
// PUT
// PATCH
// DELETE
module.exports = router;