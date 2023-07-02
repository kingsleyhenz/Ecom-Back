import bcrypt from "bcrypt";
import otpGenerator from "otp-generator"
import UserMod from './../models/UserModel.js';
import { sendConfirmationEmail } from "./email.js";
import tokenGen from './../utils/tokenGenerate.js';

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
    const existingUser = await UserMod.findOne({ email });
    if (!existingUser) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    if (otp !== existingUser.otp) {
      return res.json({
        status: "error",
        message: "Invalid OTP",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    existingUser.password = hashedPassword;
    existingUser.otp = undefined;
    await existingUser.save();
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

  
export const completeReg = async(req,res)=>{
   const {email, DateOfBirth, address} = req.body;
   try {
      const existingUser = await UserMod.findOne({email})
      if (!existingUser) {
        return res.json({
          status: "error",
          message: "User not found",
        });
      }
      existingUser.DateOfBirth = DateOfBirth;
      existingUser.address = address;
      await existingUser.save();
      return res.json({
        status: "success",
        message: "Profile updated successfully",
        data: existingUser,
      });
   } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
   }
}

export const profilePic = async(req,res)=>{
  try {
    if (req.file) {
      const existingUser = await UserMod.findOneAndUpdate(
        { email: req.body.email },
        { profilepicture: req.file.path },
        { new: true }
      );
      if (!existingUser) {
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


export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserMod.findOne({ email });
    if (!existingUser) {
      return res.json({
        status: "Error",
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }
    const token = tokenGen(existingUser);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to login",
    });
  }
};
