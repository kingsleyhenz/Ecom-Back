import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { blockUser, getActiveCustomers, getAdmins, getAllOrders, getAllUsers, getBlockedCustomers, getCustomer, unBlockUser } from "../controller/admin.js";
import { isSuper } from './../middleware/superAdmin.js';
import { createProduct, getAllProduct, updateWhole } from "../controller/products.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn, isSuper, getAllUsers);

adminRoute.get("/customers",loggedIn, isSuper, getCustomer);

adminRoute.get("/allAdmins",loggedIn, isSuper, getAdmins);

adminRoute.put("/block/:userId",loggedIn, isSuper, blockUser);

adminRoute.put("/unblock/:userId",loggedIn, isSuper, unBlockUser);

adminRoute.get("/active",loggedIn, isSuper, getActiveCustomers);

adminRoute.get("/suspended",loggedIn, isSuper, getBlockedCustomers);

adminRoute.post("/upload-to-sellCart", loggedIn, isSuper, createProduct);

adminRoute.get("all-items", loggedIn, isSuper, getAllProduct);

adminRoute.put("/update-product/:productId", loggedIn, isSuper, updateWhole);

adminRoute.get("/orders", loggedIn, isSuper, getAllOrders);




export default adminRoute
