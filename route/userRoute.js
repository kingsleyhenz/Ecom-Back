import express from "express";
import multer from "multer";
import { Register, completeReg, profilePic, verifyOTP, logIn } from "../controller/userAuth.js";
import { createProduct, getAllProduct, getByName, getByPrice, getBySubCategory, getProductByCategory } from './../controller/products.js';
import { addToCart } from './../controller/cart.js';
import { loggedIn } from './../middleware/loginAccess.js'; 


const userRoute = express.Router(); 
const upload = multer({dest:"uploads/"});

userRoute.post("/register", Register);
userRoute.post("/verifyOtp", verifyOTP);
userRoute.post("/complete-Reg",completeReg);
userRoute.post("/login", logIn);
userRoute.post("/upload-profile-picture", upload.single("profilepicture"), profilePic);
userRoute.post("/upload-to-sellCart", createProduct);
userRoute.get("/get-product/:productName", getByName); 
userRoute.get("/getProducts", getAllProduct);
userRoute.get("/getCategory/:category", getProductByCategory);
userRoute.get("/getSubCategory/:SubCategory", getBySubCategory);
userRoute.get("/filterPrice/:SubCategory/:minprice/:maxprice", getByPrice);
userRoute.post("/addToCart", loggedIn, addToCart); 

export default userRoute