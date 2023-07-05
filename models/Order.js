
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  carts: {
    type: Object,
    required: true,
  },
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
  },
  deliveryType:{
    type: String,
    enum: ["Pick-Up Station", "Door Delivery"]
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
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  paymentMethod:{
    type: String,
    enum: ["Stripe","PayStack"],
    required: true,
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;