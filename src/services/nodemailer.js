import nodemailer from "nodemailer";

const map = new Map();
export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const storeData = (email, otp) => {
  map.set(email, otp);
};

export const retrieveData = (email) => {
  return map.get(email);
};

export const removeData = (email) =>{
  map.delete(email);
}

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
    throw new Error(err.message);
  }
};
