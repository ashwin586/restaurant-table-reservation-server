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
        user: 'ashwinv586@gmail.com',
        pass: 'iiqmjuyngbzqwbcy',
      },
    });

    const mailOptions = {
      from: 'ashwinv586@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error(err.message);
  }
};
