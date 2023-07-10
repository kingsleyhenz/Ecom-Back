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
   const {email, DateOfBirth, address, phoneNumber} = req.body;
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
      existingUser.phoneNumber = phoneNumber;
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
           message: "User not found"
           });
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
    existingUser.lastLogin = Date.now();
    existingUser.save();
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

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserMod.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    const resetToken = bcrypt.genSaltSync(10);
    user.resetToken = resetToken;
    await user.save();
    await sendResetPasswordEmail(user.name, user.email, resetToken);
    res.json({
      status: 'success',
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send password reset email',
    });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await UserMod.findOne({ resetToken });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid or expired reset token',
      });
    }
    user.password = newPassword;
    user.resetToken = null;
    await user.save();
    res.json({
      status: 'success',
      message: 'Password reset successful',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset password',
    });
  }
};


export const updateProfilePicture = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    user.profilepicture = profilePicture;
    await user.save();
    res.json({
      status: "success",
      message: "User profile picture updated successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user profile picture",
    });
  }
};


export const updatePhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const exsitingUser = await UserMod.findById(req.userAuth);
    if (!exsitingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    exsitingUser.phoneNumber = phoneNumber;
    await exsitingUser.save();
    res.json({
      status: "success",
      message: "User address updated successfully",
      data: {
        exsitingUser: exsitingUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user address",
    });
  }
};


export const updateAddress = async (req, res) => {
  const { address } = req.body;
  try {
    const user = await UserMod.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    user.address = address;
    await user.save();
    res.json({
      status: "success",
      message: "User address updated successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user address",
    });
  }
};
