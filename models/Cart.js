import mongoose from "mongoose";


const userCart = new mongoose.Schema({
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const Cart = mongoose.model("Cart", userCart)

export default Cart