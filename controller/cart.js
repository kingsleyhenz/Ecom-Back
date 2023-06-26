import Product from "../models/Products.js";
import UserMod from "../models/UserModel.js";

export const addToCart = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({
      status: "error",
      message: "User not logged in",
    });
  }
  const { productId } = req.params;
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
    user.cart.push(product);
    await user.save();

    res.json({
      status: "success",
      message: "Item added to cart",
      data: user.cart,
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