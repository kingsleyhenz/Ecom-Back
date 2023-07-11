import UserMod from "../models/UserModel.js";
import Product from "../models/Products.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";



export const getAllUsers = async (req, res) => {
    try {
      if (!req.userAuth) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const users = await UserMod.find({});
      res.json({
        status: 'OK',
        data: users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to get users',
      });
    }
};
  
export const getCustomer = async(req,res)=>{
    try {
        const customers = await UserMod.find({ role: 'Customer' });
        if (customers.length === 0) {
          return res.json({
            status: 'success',
            message: 'No customers found',
          });
        }
        res.json({
          status: 'success',
          data: customers,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Failed to get customers',
        });
      }
}

export const getAdmins = async(req,res)=>{
    try {
        const admins = await UserMod.find({ role: 'Admin' });
        if (admins.length === 0) {
          return res.json({
            status: 'success',
            message: 'No admins found',
          });
        }
        res.json({
          status: 'success',
          data: admins,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Failed to get admins',
        });
      }
}

export const getActiveCustomers = async(req,res)=>{
    try {
        const customers = await UserMod.find({ role: 'Customer', accountStatus: 'Active' });
        if (customers.length === 0) {
          return res.json({
            status: 'success',
            message: 'No active customers found',
          });
        }
        res.json({
          status: 'success',
          data: customers,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Failed to get active customers',
        });
      }     
}