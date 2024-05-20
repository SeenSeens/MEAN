const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categories.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
// router.patch('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;