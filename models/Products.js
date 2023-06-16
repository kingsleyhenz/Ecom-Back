import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        default: 1,
    }
    imageUrl:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        default: 0,
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;