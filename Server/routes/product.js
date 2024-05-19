const express = require("express");
const router = express.Router();
const multer = require('multer');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/products.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;