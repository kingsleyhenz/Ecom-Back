import UserMod from "../models/UserModel.js";
import Product from "../models/Products.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";



export const getAllUsers = async (req, res) => {
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
    try {
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
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
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
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
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

export const blockUser = async(req,res)=>{
  const { userId } = req.params;
  try {
    const user = await UserMod.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    if (user.accountStatus === 'Suspended') {
      return res.status(400).json({
        status: 'error',
        message: 'User is already suspended',
      });
    }
    user.accountStatus = 'Suspended';
    await user.save();
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to suspend user',
    });
  }
}

export const unBlockUser = async(req,res)=>{
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
  const { userId } = req.params;
  try {
    const user = await UserMod.findByIdAndUpdate(userId, {accountStatus: 'Active'}, { new: true });
    if(!user){
      res.json({
        status: 'error',
        message: 'User not found'
      })
    }
    res.json({
      status: 'success',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to suspend user',
    });
  }
}

export const getActiveCustomers = async(req,res)=>{
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
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

export const getBlockedCustomers = async(req,res)=>{
  if (!req.userAuth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
    try {
        const customers = await UserMod.find({ role: 'Customer', accountStatus: 'Suspended' });
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

