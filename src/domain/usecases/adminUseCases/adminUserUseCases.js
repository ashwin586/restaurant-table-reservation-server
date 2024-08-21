export const adminUserUseCases = (adminRepository) => ({
  fetchAllUsers: async () => {
    try {
      return await adminRepository.fetchAllUsers();
    } catch (error) {
      throw new Error(error);
    }
  },

  blockUser: async (id) => {
    try {
      const existingUser = await adminRepository.findUser(id);
      if (existingUser) {
        existingUser.accountStatus = true;
        return await adminRepository.toggleUser(existingUser);
      } else throw new Error("Operation failed");
    } catch (error) {
      throw new Error(error);
    }
  },

  unBlockUser: async (id) => {
    try {
      const existingUser = await adminRepository.findUser(id);
      if (existingUser) {
        existingUser.accountStatus = false;
        return await adminRepository.toggleUser(existingUser);
      } else throw new Error("Operation failed");
    } catch (error) {
      throw new Error(error);
    }
  },
});
