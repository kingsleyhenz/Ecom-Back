import express from "express";
import multer from "multer";
import { Register, completeReg, profilePic, verifyOTP, logIn, updateProfilePicture, updateAddress, sendResetPasswordEmail, resetPassword } from "../controller/userAuth.js";
import { loggedIn } from "../middleware/loginAccess.js";




const userRoute = express.Router(); 
const upload = multer({dest:"uploads/"});

userRoute.post("/register", Register);

userRoute.post("/verifyOtp", verifyOTP);

userRoute.post("/complete-Reg",completeReg);

userRoute.post("/login", logIn);

userRoute.post("/upload-profile-picture", upload.single("profilepicture"), profilePic);

userRoute.post("update-profile-picture", loggedIn, updateProfilePicture);

userRoute.put("/update-address", loggedIn, updateAddress);

userRoute.post("/reset-token", loggedIn, sendResetPasswordEmail);

userRoute.post("/reset-password", loggedIn, resetPassword)



export default userRoute