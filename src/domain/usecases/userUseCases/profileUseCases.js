import { securePassword } from "../../../infrastructure/services/bcrypt.js";

export const userProfileUseCases = (userRepository) => ({
  profileFetch: async (email) => {
    try {
      return await userRepository.findByEmail(email);
    } catch (error) {
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
      throw new Error(error);
    }
  },

  fetchBookings: async (email) => {
    try {
      const bookings = await userRepository.fetchBookings(email);
      if (bookings) return bookings;
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchReviews: async (email) => {
    try {
      const response = await userRepository.fetchReviews(email);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  fetchReview: async (email, restId) => {
    try {
      return await userRepository.fetchReview(email, restId);
    } catch (error) {
      throw new Error(error);
    }
  },
});
