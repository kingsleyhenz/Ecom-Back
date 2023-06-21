import bcrypt from "bcrypt";
import otpGenerator from "otp-generator"
import UserMod from './../models/UserModel.js';
import { sendConfirmationEmail } from "./email.js";

export const Register = async (req, res) => {
    const { name, email } = req.body;
    try {
      const existingUser = await UserMod.findOne({email});
      if (existingUser) {
        return res.json({
          status: 'error',
          message: 'User already exists'
        });
      }
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      const newUser = await UserMod.create({
        name,
        email,
        otp,
      });
      res.json({
        status: 'success',
        data: newUser
      });
      await sendConfirmationEmail(name, email, otp);
    } catch (error) {
      res.json({
        status: 'error',
        message: error.message
      });
    }
  };

export const verifyOTP = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const user = await UserMod.findOne({ email });
    if (!user) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    if (otp !== user.otp) {
      return res.json({
        status: "error",
        message: "Invalid OTP",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.otp = undefined;
    await user.save();
    return res.json({
      status: "success",
      message: "Password set successfully",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

  

export const profilePic = async(req,res)=>{
  try {
    if (req.file) {
      const user = await UserMod.findOneAndUpdate(
        { email: req.body.email },
        { profilepicture: req.file.path },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
           message: "User not found" });
      }
      return res.status(200).json({
         message: "Profile picture uploaded successfully" 
        });
    } else {
      return res.status(400).json({
         message: "No file provided" 
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to upload profile picture" });
  }
}

export const completeReg = async(req,res)=>{
   const {email, DateOfBirth, address} = req.body;
   try {
      const user = await UserMod.findOne({email})
      if (!user) {
        return res.json({
          status: "error",
          message: "User not found",
        });
      }
      user.DateOfBirth = DateOfBirth;
      user.address = address;
      await user.save();
      return res.json({
        status: "success",
        message: "Profile updated successfully",
        data: user,
      });
   } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
   }
}