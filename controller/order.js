import Order from "../models/Order.js";
import UserMod from "../models/UserModel.js";

export const checkout = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({
      status: "error",
      message: "User not logged in",
    });
  }

  const { shippingAddress, deliveryType, paymentMethod } = req.body;

  try {
    const user = await UserMod.findById(req.userAuth).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const cartItems = user.cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: user._id,
      cart: cartItems,
      shippingAddress: shippingAddress,
      deliveryType: deliveryType,
      paymentMethod: paymentMethod,
    });

    await order.save();

    user.cart = []; // Clear the user's cart
    await user.save();

    res.json({
      status: "success",
      message: "Order placed successfully",
      data: {
        order: order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to place order",
    });
  }
};
