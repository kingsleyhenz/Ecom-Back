import express from "express";
import multer from "multer";
import { Register, completeReg, profilePic, verifyOTP, logIn, updateProfilePicture, updateAddress, sendResetPasswordEmail, resetPassword, updatePhoneNumber } from "../controller/userAuth.js";
import { loggedIn } from "../middleware/loginAccess.js";
import { isBlocked } from "../middleware/accountStatus.js";




const userRoute = express.Router(); 
const upload = multer({dest:"uploads/"});

userRoute.post("/register", Register);

userRoute.post("/verifyOtp", verifyOTP);

userRoute.post("/complete-Reg",completeReg);

userRoute.post("/login", logIn);

userRoute.post("/upload-profile-picture", upload.single("profilepicture"), profilePic);

userRoute.post("update-profile-picture", loggedIn, isBlocked, updateProfilePicture);

userRoute.put("/update-address", loggedIn, isBlocked, updateAddress);

userRoute.put("/update-phoneNumber", loggedIn, isBlocked, updatePhoneNumber);

userRoute.post("/reset-token", loggedIn, isBlocked, sendResetPasswordEmail);

userRoute.post("/reset-password", loggedIn, isBlocked, resetPassword);



export default userRoute