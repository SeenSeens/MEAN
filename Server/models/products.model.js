const mongoose= require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    description: {
        type: String,
        required: false,
    },
    excerpt: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        default: 0,
    },
    discount: {
        type: Number,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
