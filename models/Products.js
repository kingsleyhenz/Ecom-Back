import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    SubCategory:{
        type: String,
        required: true,
    },
    Model:{
        type: String,
        required: true,
    },
    specs:[{
        type: String,
    }],
    price:{ 
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        default: 0,
    },
    availability:{
        type: String,
        enum: ["Available","Out of stock"],
        default: "Available",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
          return this._createdAt.toLocaleDateString('en-US');
        }
      }
})

const Product = mongoose.model("Product", productSchema);

export default Product;