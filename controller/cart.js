import Product from "../models/Products.js";
import UserMod from "../models/UserModel.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const existingCartItem = user.cart.find(item => item.product.toString() === productId);
    if (existingCartItem) {
      const newQuantity = parseInt(quantity) || 1;
      existingCartItem.quantity += newQuantity;
      await user.save();
      return res.json({
        status: "success",
        message: "Item quantity updated in cart",
        data: {
          product: product,
          quantity: existingCartItem.quantity,
        },
      });
    }

    const cartItem = {
      product: product._id,
      quantity: parseInt(quantity) || 1,
    };
    user.cart.push(cartItem);
    await user.save();
    res.json({
      status: "success",
      message: "Item added to cart",
      data: {
        product: product,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add item to cart", 
    }); 
  }
};


export const getCart = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({
      status: "error",
      message: "User not logged in",
    });
  }
  try {
    const user = await UserMod.findById(req.userAuth).populate("cart");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      data: user.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve cart items",
    });
  }
}

export const getTotalAmount = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({
      status: "error",
      message: "User not logged in",
    });
  }
  try {
    const user = await UserMod.findById(req.userAuth).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    let totalAmount = 0;
    for (const cartItem of user.cart) {
      const { product, quantity } = cartItem;
      const { price } = product;
      totalAmount += price * quantity;
    }
    res.json({
      status: "success",
      data: {
        totalAmount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to calculate the total amount",
    });
  }
};



export const removeItem = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const item = user.cart.find((item) => item.product && item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({
        status: "error",
        message: "Item not found in cart",
      });
    }
    const itemIndex = user.cart.indexOf(item);
    user.cart.splice(itemIndex, 1);
    await user.save();
    res.json({
      status: "success",
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to remove item from cart",
    });
  }
};


export const clearCart = async(req,res)=>{
      if (!req.userAuth) {
    return res.status(401).json({
      status: 'error',
      message: 'User not logged in',
    });
  }
  try {
    const user = await UserMod.findById(req.userAuth)
    if(!user){
      res.json({
        status: 'error',
        message: 'User not found',
      })
    }
    const tot = user.cart.length
    user.cart.splice(0, tot);
    await user.save();
    res.json({
      status: "success",
      message: "Cart cleared successfully",
      data: user.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to clear cart",
    });
  }
}


export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const existingItem = user.wishlist.find(item => item.product.toString() === productId);
    if (existingItem) {
      return res.json({
        status: "error",
        message: "Item already in wishlist",
      });
    }
    const wishlistItem = {
      product: product._id,
    };
    user.wishlist.push(wishlistItem);
    await user.save();
    res.json({
      status: "success",
      message: "Item added to wishlist",
      data: {
        product: product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add item to wishlist",
    });
  }
};


export const getWishlist = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({
      status: 'error',
      message: 'User not logged in',
    });
  }
  try {
    const user = await UserMod.findById(req.userAuth).populate('wishlist.product');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    res.json({
      status: 'success',
      data: {
        wishlist: user.wishlist,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get wishlist',
    });
  }
};



export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    const productIndex = user.wishlist.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found in wishlist',
      });
    }
    user.wishlist.splice(productIndex, 1);
    await user.save();
    res.json({
      status: 'success',
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove product from wishlist',
    });
  }
};
