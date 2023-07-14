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
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
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
    const user = await UserMod.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    if (user.accountStatus === 'Active') {
      return res.status(400).json({
        status: 'error',
        message: 'User is already active',
      });
    }
    user.accountStatus = 'Active';
    await user.save();
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to unsuspend user',
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

export const getAllOrders = async(req,res)=>{
  if(!req,userAuth){
    req.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const orders = await Order.find({})
    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Failed to get active customers',
        });
  }
}

export const getShippedOrders = async(req,res)=>{
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const orders = await Order.find({ deliveryStatus: 'Shipped'})
    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get Orders'
    })
  }
}

export const getDeliveredOrders = async (req, res) => {
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const orders = await Order.find({ deliveryStatus: 'Delivered'})
    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get Orders'
    })
  }
}

export const getCanceledOrders = async (req, res) => {
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const orders = await Order.find({ deliveryStatus: 'Canceled'})
    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get Orders'
    })
  }
}

export const getPendingOrders = async (req, res) => {
  if(!req.userAuth){
    res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const orders = await Order.find({ deliveryStatus: 'Pending'})
    res.json({
      status: 'success',
      data: orders
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get Orders'
    })
  }
}

export const makeAdmin = async(req,res)=>{
  if(!req,userAuth){
    req.status(401).json({ message: 'Unauthorized' })
  }
  const { userId } = req.params;
  try {
    const user = await UserMod.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    if (user.role === 'Admin') {
      return res.status(400).json({
        status: 'error',
        message: 'User is already an admin',
      });
    }
    user.role = 'Admin';
    await user.save();
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to make user an admin',
    });
  }
}



export const removeAdmin = async(req,res)=>{
  const { userId } = req.params;
  try {
    const user = await UserMod.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    if (user.role !== 'Admin') {
      return res.status(400).json({
        status: 'error',
        message: 'User is not an admin',
      });
    }
    user.role = 'Customer';
    await user.save();
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove admin role from user',
    });
  }
}