import { saveUser, findUser, savenewpassword } from "../../repositories/userRepository.js";
import { matchPassword, securePassword } from "../../services/bcrypt.js";
import {retrieveData, removeData } from "../../services/nodemailer.js";


export const userData = async (userDetails) => {
  const { name, phoneNumber, email, password } = userDetails;
  try {
    const existingUser = await findUser(email);
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      const hashedPassword = await securePassword(password);
      const userData = {
        name,
        phoneNumber,
        email,
        password: hashedPassword,
      };
      return await saveUser(userData);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const checkUserInfo = async (userData) => {
  try {
    const response = await findUser(userData.email);
    if (!response) {
      throw new Error("Email not registered");
    }

    const comparedPassword = await matchPassword(
      userData.password,
      response.password
    );

    if (!comparedPassword) {
      throw new Error("Invalid email or password");
    }
    return response;
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
    const storedOtp = retrieveData(email)
    console.log(storedOtp);
    if (storedOtp === otp) {
      return true
    } else{
      throw new Error('Entered OTP is not correct');
    }
  } catch (err) {
    throw new Error(err.message)
  }
};

export const newPasswordCreate = async(password, email) =>{
  try{
    const hashedPassword = await securePassword(password);
    const user = await findUser(email)
    console.log(user)
    if(user){
      removeData(email);
      return await savenewpassword(hashedPassword, user);
    } else {
      throw new Error('Oops! Something went wrong...')
    }
  }catch(err){
    console.log(err);
    throw new Error(err.message)
  }
}