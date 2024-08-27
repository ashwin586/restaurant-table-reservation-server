import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userAuthUseCases } from "../../../domain/usecases/userUseCases/authUseCase.js";
import * as tokenServices from "../../../infrastructure/services/tokenServices.js";
import * as nodeMailer from "../../../infrastructure/services/nodemailer.js";

import { Validator } from "node-input-validator";
import { query } from "express-validator";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userAuthUseCaseInstance = userAuthUseCases(
  userRepositoryInstance,
  tokenServices,
  nodeMailer
);

export const userAuthControllers = {
  register: async (req, res) => {
    try {
      const userDetails = req.body;
      await userAuthUseCaseInstance.registerUser(userDetails);
      return res.status(200).json({ email: userDetails.email });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const userData = req.body;
      const response = await userAuthUseCaseInstance.loginUser(userData);
      if (response.error)
        return res
          .status(response.statusCode)
          .json({ message: response.error });
      return res.status(200).json({ userToken: response.userToken });
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
      console.log(result);
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

  otpVerify: async (req, res) => {
    try {
      const { otp, email } = req.body;
      await userAuthUseCaseInstance.otpVerify(otp, email);
      return res.status(200).json({ message: "Verification Successfull" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

export const emailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const hasUser = await checkUser(email);
    if (hasUser) {
      const otp = generateOtp();
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
