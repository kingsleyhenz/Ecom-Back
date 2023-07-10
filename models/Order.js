import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  shippingAddress: {
    type: {
      country: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
    },
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  deliveryType: {
    type: String,
    enum: ["Pick-Up Station", "Door Delivery"],
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  dateDelivered: {
    type: Date,
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ["Stripe", "PayStack"],
    required: true,
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
