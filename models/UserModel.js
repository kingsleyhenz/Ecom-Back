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
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
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
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    paymentMethod:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod"
    }],
    profilepicture:{
        type: String,
    },
    sellCart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    accountStatus: {
        type: String,
        enum: ["Active", "Suspended", "Deleted"],
        default: "Active",
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