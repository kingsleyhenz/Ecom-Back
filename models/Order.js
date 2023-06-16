import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function() {
      return this._createdAt.toLocaleDateString('en-US');
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
