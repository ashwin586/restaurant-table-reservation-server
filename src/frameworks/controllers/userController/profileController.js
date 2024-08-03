import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userProfileUseCases } from "../../../domain/usecases/userUseCases/profileUseCases.js";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userProfileUseCasesInstance = userProfileUseCases(userRepositoryInstance);

export const userProfileControllers = {
  fetchProfile: async (req, res) => {
    try {
      const { email } = req.token;
      const userProfile = await userProfileUseCasesInstance.profileFetch(email);
      return res.status(200).json({ userData: userProfile });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const userDetails = req.body;
      await userProfileUseCasesInstance.editUser(userDetails);
      return res.status(200).end();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  editUserImage: async (req, res) => {
    try {
      const { imageURL, userId } = req.body;
        await userProfileUseCasesInstance.updateProfileImage(imageURL, userId);
      return res.status(200).end();
    } catch (err) {
      return res.status(400).json(err.message);
    }
  },
};
