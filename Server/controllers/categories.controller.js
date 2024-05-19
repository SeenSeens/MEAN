const Category= require("../models/categories.model");
const fs = require('fs');
const Product = require("../models/products.model");

// Function to handle image upload
const handleImageUpload = async (imageFile) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const imageExtension = imageFile.originalname.split('.').pop();
    const imageName = Date.now() + '.' + imageExtension;
    const imagePath = uploadDir + imageName;
    await fs.promises.writeFile(imagePath, imageFile.buffer);
    return imagePath;
};

// Lấy tất cả chuyên mục
const getCategories = async (req, res) => {
   /* const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;*/
    try {
        /*const totalCount = await Category.countDocuments({});
        const category = await Category.find({}).skip(skip).limit(limit);
        const totalPages = Math.ceil(totalCount / limit);
        res.status(200).json({
            totalPages: totalPages,
            currentPage: page,
            category: category
        });*/
        const category = await Category.find();
        res.status(200).json(category);
    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// Lấy 1 chuyên mục
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('products');
        res.status(200).json(category);
    }catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Thêm mới chuyên mục
const createCategory = async (req, res) => {
    try {
        console.log('createCategory called'); // Log để biết hàm được gọi
        let imagePath = null;
        if (req.file) {
            console.log('Image file received:', req.file); // Log chi tiết về file ảnh
            imagePath = await handleImageUpload(req.file);
        }
        const categoryData = { ...req.body, image: imagePath };
        console.log('Product data:', categoryData); // Log dữ liệu chuyên mục
        const category = await Category.create(categoryData);
        res.status(200).json(category);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
}
// Cập nhật chuyên mục
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        if (req.file) {
            let imagePath = await handleImageUpload(req.file);
            req.body.image = imagePath;
            if (category.image) {
                fs.unlinkSync(category.image); // Xóa ảnh cũ nếu có
            }
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Xóa chuyên mục
/*const deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        await Category.findByIdAndDelete(id);
        await Product.updateMany({ products: id }, { products: null })
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}*/
const deleteCategory = async (req, res) => {
    try {
        await Product.updateMany(
            { products: req.params.id },
            { products: null}
        );
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted successfully")
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}