import {
  matchPassword,
  securePassword,
} from "../../../infrastructure/services/bcrypt.js";
// import {
//   retrieveData,
//   removeData,
// } from "../../../infrastructure/services/nodemailer.js";

import { createUser } from "../../entities/user.js";

export const userAuthUseCases = (userRepository, tokenServices) => ({
  registerUser: async (userDetails) => {
    try {
      const user = createUser(userDetails);

      if (!user.isValidEmail()) {
        throw new Error("Invalid email");
      }

      const existingUser = await userRepository.findByEmail(user.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      user.password = await securePassword(userDetails.password);
      return await userRepository.saveUser(user);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  loginUser: async (userData) => {
    const email = userData.email;
    try {
      const response = await userRepository.findByEmail(email);
      if (!response) {
        throw new Error("Email not registered");
      }

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
    } catch (err) {
      throw new Error(err.message);
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
      console.log(error);
      throw new Error(error.message);
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
      console.log(error);
      throw new Error(error);
    }
  },

  forgotPassword: async (password, email) => {
    try {
      const hashedPassword = await securePassword(password);
      const user = await userRepository.findByEmail(email);
      if (user) {
        // removeData(email); // ! Removing the email from the map in nodemailer (Need to re-write the logic of nodemailer)
        const updatedPassword = { password: hashedPassword };
        return await userRepository.forgotPassword(user._id, updatedPassword);
      } else {
        throw new Error("Oops! Something went wrong...");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
});

export const checkExistingUser = async (email) => {
  try {
    const user = await findUser(email);
    if (!user) throw new Error("Email not registered");
    if (user) {
      if (user.accountStatus)
        throw new Error("Account has been blocked by the admin");
      const userToken = await generateUserToken(email);
      return { userToken };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const checkUser = async (email) => {
  try {
    const user = await findUser(email);
    if (!user) throw new Error("Email not registered");
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const userOtp = async (otp, email) => {
  try {
    const storedOtp = retrieveData(email);
    if (storedOtp === otp) {
      return true;
    } else {
      throw new Error("Entered OTP is not correct");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const existingUserStatus = async (email) => {
  try {
    const user = await findUser(email);
    if (!user.accountStatus) return true;
    else throw new Error("Something went wrong");
  } catch (err) {
    throw new Error(err.message);
  }
};
