import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { blockUser, getActiveCustomers, getAdmins, getAllOrders, getAllUsers, getBlockedCustomers, getCanceledOrders, getCustomer, getDeliveredOrders, getPendingOrders, getShippedOrders, makeAdmin, removeAdmin, unBlockUser } from "../controller/admin.js";
import { isSuper } from './../middleware/superAdmin.js';
import { createProduct, getAllProduct, getItemsByCategory, getItemsBySubcategory, getSellItemsByUser, updateWhole } from "../controller/products.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn, isSuper, getAllUsers);

adminRoute.get("/customers",loggedIn, isSuper, getCustomer);

adminRoute.get("/allAdmins",loggedIn, isSuper, getAdmins);
    
adminRoute.put("/block/:userId",loggedIn, isSuper, blockUser);

adminRoute.put("/unblock/:userId",loggedIn, isSuper, unBlockUser);

adminRoute.get("/active",loggedIn, isSuper, getActiveCustomers);

adminRoute.get("/suspended",loggedIn, isSuper, getBlockedCustomers);

adminRoute.post("/upload-to-sellCart", loggedIn, isSuper, createProduct);

adminRoute.get("/all-items", loggedIn, isSuper, getAllProduct);

adminRoute.put("/update-product/:productId", loggedIn, isSuper, updateWhole);

adminRoute.get("/user-items/:userId", loggedIn, isSuper, getSellItemsByUser);

adminRoute.get("/user-items/:category",loggedIn, isSuper, getItemsByCategory);

adminRoute.get("/user-items/:subcategory",loggedIn, isSuper, getItemsBySubcategory);

adminRoute.put("/makeAdmin/:userId", loggedIn, isSuper, makeAdmin);

adminRoute.put("/removeAdmin", loggedIn, isSuper, removeAdmin);

adminRoute.get("/orders", loggedIn, isSuper, getAllOrders); 

adminRoute.get("/shipped", loggedIn, isSuper, getShippedOrders);

adminRoute.get("/delivered", loggedIn, isSuper, getDeliveredOrders);

adminRoute.get("/pending", loggedIn, isSuper, getPendingOrders);

adminRoute.get("/canceled", loggedIn, isSuper, getCanceledOrders);




export default adminRoute
