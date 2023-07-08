import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ["Paystack", "Stripe"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Successful', 'Pending', 'Failed'],
    default: 'Pending',
  },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;
