import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { getAllUsers, getCustomer } from "../controller/admin.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn, isAdmin, getAllUsers);

adminRoute.get("/customers",loggedIn, isAdmin, getCustomer);



export default adminRoute
