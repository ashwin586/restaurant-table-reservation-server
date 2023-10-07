import { saveUser, findUser } from "../../repositories/userRepository.js";
import { matchPassword, securePassword } from "../../services/bcrypt.js";

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
