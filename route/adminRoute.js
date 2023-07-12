import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { getActiveCustomers, getAdmins, getAllUsers, getBlockedCustomers, getCustomer } from "../controller/admin.js";
import { isSuper } from './../middleware/superAdmin.js';
import { createProduct, getAllProduct, updateCategory } from "../controller/products.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn, isSuper, getAllUsers);

adminRoute.get("/customers",loggedIn, isSuper, getCustomer);

adminRoute.get("/allAdmins",loggedIn, isSuper, getAdmins);

adminRoute.get("/active",loggedIn, isSuper, getActiveCustomers);

adminRoute.get("/suspended",loggedIn, isSuper, getBlockedCustomers);

adminRoute.post("/upload-to-sellCart", loggedIn, isSuper, createProduct);

adminRoute.get("all-items", loggedIn, isSuper, getAllProduct);

adminRoute.put("/update-product-categories/:productId", loggedIn, isSuper, updateCategory);



export default adminRoute
