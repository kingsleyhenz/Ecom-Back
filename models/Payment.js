import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Credit Card", "Bank Transfer"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Paystack", "Flutterwave"],
    required: true,
  },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;
