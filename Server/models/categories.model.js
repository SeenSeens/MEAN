const mongoose= require("mongoose");
const CategorySchema = new mongoose.Schema({
    name: { // Tên chuyên mục
        type: String,
        required:true
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;