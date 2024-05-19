const Product = require("../models/products.model")
const Category = require("../models/categories.model");
const fs = require('fs');

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

// Lấy tất cả sản phẩm
const getProducts = async (req, res) => {
    /*const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;*/
    try {
        /*const totalCount = await Product.countDocuments({});
        const products = await Product.find({}).skip(skip).limit(limit);
        const totalPages = Math.ceil(totalCount / limit);
        res.status(200).json({
            totalPages: totalPages,
            currentPage: page,
            products: products
        });*/
        const product = await Product.find();
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Lấy 1 sảm phẩm
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Thêm mới sản phẩm
const createProduct = async (req, res) => {
    try {
        console.log('createProduct called'); // Log để biết hàm được gọi
        let imagePath = null;
        if (req.file) {
            console.log('Image file received:', req.file); // Log chi tiết về file ảnh
            imagePath = await handleImageUpload(req.file);
        }
        const productData = { ...req.body, thumbnail: imagePath };
        console.log('Product data:', productData); // Log dữ liệu sản phẩm
        const product = await Product.create(productData);

        // Kiểm tra nếu có category được gửi từ client
        if (req.body.category) {
            // Tìm danh mục sản phẩm
            const category = await Category.findById(req.body.category);
            if ( !category ) {
                // Nếu danh mục không tồn tại, trả về một thông báo lỗi
               return res.status(404).json({ message: "Category not found" });
            }
            await category.updateOne({ $push: { products: product._id } });
        }
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (req.file) {
            let imagePath = await handleImageUpload(req.file);
            req.body.thumbnail = imagePath;
            if (product.thumbnail) {
                fs.unlinkSync(product.thumbnail); // Xóa ảnh cũ nếu có
            }
        }
        await product.updateOne({ $set: req.body })
        res.status(200).json("Updated successfully!");
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        await Category.updateMany(
            { products: req.params.id },
            {$pull: { products: req.params.id }}
        );
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted successfully")
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
