import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { getActiveCustomers, getAdmins, getAllUsers, getBlockedCustomers, getCustomer } from "../controller/admin.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn, isAdmin, getAllUsers);

adminRoute.get("/customers",loggedIn, isAdmin, getCustomer);

adminRoute.get("/allAdmins",loggedIn, isAdmin, getAdmins);

adminRoute.get("/active",loggedIn, isAdmin, getActiveCustomers);

adminRoute.get("/suspended",loggedIn, isAdmin, getBlockedCustomers);



export default adminRoute
