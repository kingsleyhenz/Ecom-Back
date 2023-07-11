import express from "express";
import { loggedIn } from "../middleware/loginAccess.js";
import { isAdmin } from './../middleware/adminAccess.js';
import { getAllUsers } from "../controller/admin.js";

const adminRoute = express.Router()

adminRoute.get("/allUsers",loggedIn,isAdmin, getAllUsers);



export default adminRoute
