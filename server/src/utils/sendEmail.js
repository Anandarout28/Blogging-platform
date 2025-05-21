import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js"; 

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or use "smtp.mailtrap.io" etc. for dev
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Only use in dev!
      },
    });

    const mailOptions = {
      from: `"My Blog Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new ApiError(500, "Failed to send email. Please try again later.");
  }
};

