export const adminPartnerUseCases = (adminRepository) => ({
  fetchPartners: async () => {
    try {
      return await adminRepository.fetchAllPartners();
    } catch (error) {
      throw new Error(error);
    }
  },

  blockPartner: async (id) => {
    try {
      const existingPartner = await adminRepository.findPartner(id);
      if (existingPartner) {
        existingPartner.accountStatus = true;
        await adminRepository.togglePartner(existingPartner);
      } else throw new Error("Operation failed");
    } catch (error) {
      throw new Error(error);
    }
  },

  unBlockPartner: async (id) => {
    try {
      const existingPartner = await adminRepository.findPartner(id);
      if (existingPartner) {
        existingPartner.accountStatus = false;
        await adminRepository.togglePartner(existingPartner);
      } else throw new Error("Operation failed");
    } catch (error) {
      throw new Error(error);
    }
  },
});

