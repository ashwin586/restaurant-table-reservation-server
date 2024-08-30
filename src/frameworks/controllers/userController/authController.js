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
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
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
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
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
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  googleLogin: async (req, res) => {
    try {
      const email = req.body.email;
      const response = await userAuthUseCaseInstance.googleLogin(email);
      return res.status(200).json({ userToken: response });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  sendLink: async (req, res) => {
    try {
      const { email } = req.body;
      await userAuthUseCaseInstance.sendLink(email);
      return res.status(200).json({ message: "Password reset link sent." });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password, token } = req.body;
      await userAuthUseCaseInstance.resetPassword(password, token);
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  resendOtp: async (req, res) => {
    try {
      const { email } = req.body;
      await userAuthUseCaseInstance.resendOtp(email);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  otpVerify: async (req, res) => {
    try {
      const { otp, email } = req.body;
      await userAuthUseCaseInstance.otpVerify(otp, email);
      return res.status(200).json({ message: "Verification Successfull" });
    } catch (error) {
      console.log(error);
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
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};