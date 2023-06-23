import express from "express";
import multer from "multer";
import { Register, completeReg, profilePic, verifyOTP, logIn } from "../controller/userAuth.js";
import { createProduct, getAllProduct, getProductByCategory } from './../controller/products.js';


const userRoute = express.Router(); 
const upload = multer({dest:"uploads/"});

userRoute.post("/register", Register);
userRoute.post("/verifyOtp", verifyOTP);
userRoute.post("/complete-Reg",completeReg);
userRoute.post("/login", logIn);
userRoute.post("/upload-profile-picture", upload.single("profilepicture"), profilePic);
userRoute.post("/upload-to-sellCart", createProduct);
userRoute.get("/getProducts", getAllProduct);


export default userRoute