import { securePassword } from "../../../infrastructure/services/bcrypt.js";

export const userProfileUseCases = (userRepository) => ({
  profileFetch: async (email) => {
    try {
      return await userRepository.findByEmail(email);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  editUser: async (userData) => {
    try {
      const user = await userRepository.findByEmail(userData.email);
      if (user) {
        const updatedFields = {
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          password: userData.password,
        };
        if (userData.password) {
          const hashedPassword = await securePassword(password);
          updatedFields.password = hashedPassword;
        }
        return await userRepository.updateUser(user._id, updatedFields);
      } else throw new Error("User not found");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  updateProfileImage: async (imageURL, userId) => {
    try {
      const user = await userRepository.findById(userId);
      if (user.accountStatus) throw new Error("Something went wrong.");
      user.userImage = imageURL;
      return await userRepository.updateUser(userId, user);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
});