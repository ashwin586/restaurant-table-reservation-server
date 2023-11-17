import {
  userData,
  checkUserInfo,
  checkUser,
  userOtp,
  newPasswordCreate,
  googleSignUp,
  checkExistingUser,
} from "../../../usecases/userUseCases/authUseCase.js";
import {
  sendMail,
  generateOtp,
  storeData,
} from "../../../services/nodemailer.js";

export const sendOtp = async (req, res) => {
  try {
    const otp = generateOtp();
    const email = req.body.email;
    storeData(email, otp);
    const subject = "Email Verification otp";
    const text = `Your email verificatoin OTP is ${otp}`;
    await sendMail(email, subject, text);
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;
    const userDetails = {
      name,
      phoneNumber,
      email,
      password,
    };
    const response = await userData(userDetails);
    if (response) {
      return res.status(200).end();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const googleRegister = async (req, res) => {
  try {
    const { displayName, email } = req.body;
    const result = await googleSignUp(displayName, email);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const response = await checkUserInfo(req.body);
    if (response) {
      return res.status(200).json({ userToken: response.userToken });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const result = await checkExistingUser(req.body.email)
    if(result.userToken){
      return res.status(200).json({userToken: result.userToken});
    }
  } catch (err) {
    console.log(err);
  }
};

export const emailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const hasUser = await checkUser(email);
    if (hasUser) {
      const otp = generateOtp();
      storeData(hasUser.email, otp);
      const subject = "Email verification otp";
      const text = `The otp for your password reset is ${otp}`;
      const email = hasUser.email;
      await sendMail(email, subject, text);
      return res.status(200).end();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const otpVerify = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const result = await userOtp(otp, email);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const newPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const result = await newPasswordCreate(password, email);
    if (result) {
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
