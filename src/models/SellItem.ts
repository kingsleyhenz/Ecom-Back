import mongoose, { Schema, Document, Model } from "mongoose"; 

export interface ISellItem extends Document {
  user: mongoose.Types.ObjectId;
  category: string;
  SubCategory: string;
  Model: string;
  specs: string[];
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
  userDetails: {
    email: string;
    phoneNumber: string;
    address: string;
  };
  createdAt: Date;
}

const sellSchema: Schema<ISellItem> = new mongoose.Schema({
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
    }
});

const SellItem: Model<ISellItem> = mongoose.model<ISellItem>("sellItem", sellSchema);

export default SellItem;
