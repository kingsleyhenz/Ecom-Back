import nodemailer from 'nodemailer'
import dotenv from "dotenv";


dotenv.config()

export const sendConfirmationEmail = async (name, email, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ayehenz29@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: "ayehenz29@gmail.com",
        to: email,
        subject: "Welcome to My App!",
        text: `Hi ${name},\n\nWelcome to TonVoir ${name}. We're excited to have you onboard!\n\nTo complete your registration use this otp ${otp}\n\nBest regards,\nMy App Team`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error.message);
    }
  };