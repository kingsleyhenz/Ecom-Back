import express from "express";
import multer from "multer";
import { Register, completeReg, profilePic, verifyOTP, logIn } from "../controller/userAuth.js";




const userRoute = express.Router(); 
const upload = multer({dest:"uploads/"});

userRoute.post("/register", Register);

userRoute.post("/verifyOtp", verifyOTP);

userRoute.post("/complete-Reg",completeReg);

userRoute.post("/login", logIn);

userRoute.post("/upload-profile-picture", upload.single("profilepicture"), profilePic);



export default userRoute