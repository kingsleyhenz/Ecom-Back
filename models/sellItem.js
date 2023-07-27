import mongoose from "mongoose"; 

const sellSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type: String,
        required: true,
    },
    SubCategory:{
        type: String,
        required: true,
    },
    Model:{
        type: String,
        required: true,
    },
    specs:[{
        type: String,
    }],
    price:{ 
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        default: 1,
    },
    userDetails:{
        type: {
            email: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            }
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function() {
          return this._createdAt.toLocaleDateString('en-US');
        }
      }
}) 

const sellItem = mongoose.model("sellItem", sellSchema);

export default sellItem