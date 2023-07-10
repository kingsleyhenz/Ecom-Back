import UserMod from "../models/UserModel.js";
import Product from "../models/Products.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";



export const getAllUsers = async(req,res)=>{
    try{
        const users = await UserMod.find({})
        res.json({
            status: "OK",
            data: users
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
          status: 'error',
          message: 'Failed to get users',
        });
    }
}