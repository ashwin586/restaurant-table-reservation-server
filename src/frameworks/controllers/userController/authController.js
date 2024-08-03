import {
  checkUser,
  userOtp,
  existingUserStatus,
} from "../../../domain/usecases/userUseCases/authUseCase.js";
import {
  sendMail,
  generateOtp,
  storeData,
} from "../../../infrastructure/services/nodemailer.js";

import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userAuthUseCases } from "../../../domain/usecases/userUseCases/authUseCase.js";
import * as tokenServices from "../../../infrastructure/services/tokenServices.js";

import { Validator } from "node-input-validator";
import { query } from "express-validator";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userAuthUseCaseInstance = userAuthUseCases(
  userRepositoryInstance,
  tokenServices
);

export const userAuthControllers = {
  register: async (req, res) => {
    try {
      const userDetails = req.body;
      const validation = new Validator(req.body, {
        name: "required|minLength:3",
        phoneNumber: "required|maxLength:10",
        email: "required|email",
        password: "required",
      });
      const matched = await validation.check();
      if (!matched) throw Error("Please fill all the fields correctly");

      await userAuthUseCaseInstance.registerUser(userDetails);
      return res.status(200).json({ message: "Registration successfull" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const userData = req.body;
      const validation = new Validator(userData, {
        email: "required|email",
        password: "required",
      });

      const matched = await validation.check();
      if (!matched) throw Error("Invalid email and password");
      const { userToken } = await userAuthUseCaseInstance.loginUser(userData);
      return res.status(200).json({ userToken: userToken });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  googleRegister: async (req, res) => {
    try {
      const { displayName, email } = req.body;
      const result = await userAuthUseCaseInstance.googleSignUp(
        displayName,
        email
      );
      if (result) {
        return res.status(200).end();
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  },

  googleLogin: async (req, res) => {
    try {
      const result = await userAuthUseCaseInstance.googleLogin(req.body.email);
      if (result.userToken) {
        return res.status(200).json({ userToken: result.userToken });
      }
    } catch (err) {
      return res.status(400).json(err.message);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { password, email } = req.body;
      const result = await userAuthUseCaseInstance.forgotPassword(
        password,
        email
      );
      if (result) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};

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
    console.log(err);
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



export const checkUserStatus = async (req, res) => {
  try {
    const result = await existingUserStatus(req.token.email);
    if (result) return res.status(200).end();
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
