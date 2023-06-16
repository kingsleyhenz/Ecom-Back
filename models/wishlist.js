import mongoose from "mongoose";


const userWishlist = new mongoose.Schema({
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
})

const Wishlist = mongoose.model("Wishlist", userWishlist);

export default Wishlist;