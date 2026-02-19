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
    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    const order = new Order({
      user: user._id,
      cart: cartItems,
      shippingAddress: shippingAddress,
      deliveryType: deliveryType,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
    });
    await order.save();
    user.cart = [];
    user.orders.push(order._id);
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


export const getOrder = async (req, res) => {
    if (!req.userAuth) {
      return res.status(401).json({
        status: "error",
        message: "User not logged in",
      });
    }
    try {
      const user = await UserMod.findById(req.userAuth);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      const orders = await Order.find({ user: user._id });
      res.json({
        status: "success",
        data: {
          orders: orders,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve orders",
      });
    }
  };


export const markOrderDelivered = async (req, res) => {
    const { orderId } = req.params;  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Order not found",
        });
      }
      order.deliveryStatus = "Delivered";
      order.dateDelivered = new Date();
      await order.save();
      res.json({
        status: "success",
        message: "Order delivery status updated",
        data: {
          order: order,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Failed to update delivery status",
      });
    }
  };
  

export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Order.findById(orderId).populate('user');
      if (!order) {
        return res.status(404).json({
          status: 'error',
          message: 'Order not found',
        });
      }
      if (order.user._id.toString() !== req.userAuth._id.toString()) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized to cancel this order',
        });
      }
      if (order.deliveryStatus !== 'Pending' && order.deliveryStatus !== 'Shipped') {
        return res.status(403).json({
          status: 'error',
          message: 'Unable to cancel this order',
        });
      }
      order.deliveryStatus = 'Canceled';
      await order.save();
      res.json({
        status: 'success',
        message: 'Order canceled successfully',
        data: {
          order: order,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to cancel order',
      });
    }
  };
  