import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
    },
    DateOfBirth:{
        type: Date,
    },
    password:{
        type: String, 
    },
    address: {
        type: {
            country: {
                type: String,
                required: false 
            },
            city: {
                type: String,
                required: false
            },
            state: {
                type: String,
                required: false
            }
        },
    },
    phoneNumber:{
        type: String
    },
    cart: [
        {
          product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product"
         },
          quantity: { 
            type: Number, 
            default: 1
         },
        },
      ],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    role:{
        type: String,
        enum:["Admin", "Customer","SuperAdmin"],
        default: "Customer"
    },
    notification:[{
        type: String,
    }],
    discount:{
        type: Number,
        default: 0
    },
    wishlist: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      }],
    paymentMethod:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod"
    }],
    profilepicture:{
        type: String,
    },
    sellCart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellItem"
    }],
    accountStatus: {
        type: String,
        enum: ["Active", "Suspended"],
        default: "Active",
      },
      resetToken: {
        type: String,
        default: null,
      },
      lastLogin: {
        type: Date,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
          return this._createdAt.toLocaleDateString('en-US');
        }
      }
})

const UserMod = mongoose.model("User", userSchema)

export default UserMod