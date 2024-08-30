import nodemailer from "nodemailer";

export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const sendLink = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      html: text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
