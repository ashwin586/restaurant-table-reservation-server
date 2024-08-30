import {
  matchPassword,
  securePassword,
} from "../../../infrastructure/services/bcrypt.js";

import { createUser } from "../../entities/user.js";
import { createOtp } from "../../entities/otp.js";
import { createToken } from "../../entities/tokens.js";

export const userAuthUseCases = (
  userRepository,
  tokenServices,
  nodeMailer
) => ({
  registerUser: async (userDetails) => {
    try {
      const user = createUser(userDetails);
      const existingUser = await userRepository.findByEmail(user.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      user.password = await securePassword(userDetails.password);

      const otpGenerated = nodeMailer.generateOtp();
      const expiresAt = new Date(Date.now() + 30 * 1000);
      const email = userDetails.email;
      const subject = "Email Verification otp";
      const text = `Your email verificatoin OTP is ${otpGenerated}`;
      const otp = createOtp({
        email: email,
        otp: otpGenerated,
        expiresAt: expiresAt,
      });

      await nodeMailer.sendMail(email, subject, text);
      await userRepository.saveUser(user);
      await userRepository.saveOtp(otp);
    } catch (error) {
      throw new Error("Failed to register", error);
    }
  },

  loginUser: async (userData) => {
    try {
      const email = userData.email;
      const response = await userRepository.findByEmail(email);
      if (!response) {
        throw new Error("Email not registered");
      }

      if (!response.isVerified)
        return { error: "Email is not verified", statusCode: 401 };

      if (response.accountStatus)
        throw new Error(
          "Your account has been blocked, Please try to contact our team."
        );

      const comparedPassword = await matchPassword(
        userData.password,
        response.password
      );

      if (comparedPassword) {
        const userToken = await tokenServices.generateUserToken(email);
        return { userToken };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      throw new Error("Failed to login user", error);
    }
  },

  googleSignUp: async (name, email) => {
    try {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser)
        throw new Error("This email already in use, Please signin");
      const user = createUser({ name: name, email: email });
      const res = await userRepository.saveUser(user);
      if (res) return true;
    } catch (error) {
      throw new Error("Google signup authentication failed", error);
    }
  },

  googleLogin: async (email) => {
    try {
      const response = await userRepository.findByEmail(email);
      if (!response) {
        throw new Error("Email not registered");
      }

      if (response.accountStatus)
        throw new Error(
          "Your account has been blocked, Please try to contact our team."
        );
      return await tokenServices.generateUserToken(email);
    } catch (error) {
      throw new Error("Google signin authentication failed", error);
    }
  },

  sendLink: async (email) => {
    try {
      const existingUser = await userRepository.findByEmail(email);
      const userId = existingUser._id;
      if (!existingUser) throw new Error("Email not registered");

      const token = await tokenServices.restoreToken(email);
      const expiresAt = new Date(Date.now() + 60 * 1000);

      const restoreToken = createToken({
        userId: userId,
        token: token,
        expiresAt: expiresAt,
      });

      const resetLink = `${process.env.RESETLINK}?token=${token}`;
      const subject = "Password Reset Link";
      const text = `<p> <a href="${resetLink}">Click here</a> to reset your password. The link will expire in 5 minutes.</p>`;

      await nodeMailer.sendLink(email, subject, text);
      await userRepository.saveToken(restoreToken);
    } catch (error) {
      throw new Error("Something went wrong", error);
    }
  },

  resetPassword: async (password, token) => {
    try {
      const existingToken = await userRepository.findToken(token);
      if (!existingToken) throw new Error("Invalid or Expired Token");
      const tokenId = existingToken._id;

      const hashedPassword = await securePassword(password);

      const userId = existingToken.userId;

      const updatedPassword = { password: hashedPassword };
      await userRepository.updateUser(userId, updatedPassword);
      await userRepository.removeRestoreToken(tokenId);
    } catch (error) {
      throw new Error(`Failed to reset password: ${error.message}`);
    }
  },

  resendOtp: async (email) => {
    try {
      const otpGenerated = nodeMailer.generateOtp();
      const expiresAt = new Date(Date.now() + 30 * 1000);
      const subject = "Email Verification otp";
      const text = `Your email verificatoin OTP is ${otpGenerated}`;
      const otp = createOtp({
        email: email,
        otp: otpGenerated,
        expiresAt: expiresAt,
      });
      await nodeMailer.sendMail(email, subject, text);
      await userRepository.saveOtp(otp);
    } catch (error) {
      throw new Error("Failed to send otp", error);
    }
  },

  otpVerify: async (otp, email) => {
    try {
      const exisitinOtp = await userRepository.findOtp(email);
      if (!exisitinOtp) throw new Error("Otp Expired.");
      if (exisitinOtp.otp === otp) {
        const existingUser = await userRepository.findByEmail(email);
        existingUser.isVerified = true;
        const userId = existingUser._id;
        await userRepository.updateUser(userId, existingUser);
      } else throw new Error("Entered otp is wrong.");
    } catch (error) {
      throw new Error("OTP verification failed", error);
    }
  },
});
