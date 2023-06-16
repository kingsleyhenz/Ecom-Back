import mongoose from "mongoose";


const userCart = new mongoose.Schema({
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
          return this._createdAt.toLocaleDateString('en-US');
        }
      }
})

const Cart = mongoose.model("Cart", userCart)

export default Cart