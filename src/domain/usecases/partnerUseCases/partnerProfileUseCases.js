export const partnerProfileUseCases = (partnerRepository, bcrypt) => ({
  fetchPartner: async (number) => {
    try {
      return await partnerRepository.findPartner(number);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  editPartner: async (data, number) => {
    try {
      const existingPartner = await partnerRepository.findPartner(number);
      if (!existingPartner) throw new Error("Partner not found");
      const updatedField = {};

      for (const key in data) {
        if (key === "password") {
          const isPassMatching = await bcrypt.matchPassword(
            data.password,
            existingPartner.password
          );
          if (!isPassMatching)
            updatedField[password] = await bcrypt.securePassword(data.password);
        } else if (existingPartner[key] !== data[key])
          updatedField[key] = data[key];
      }

      if (Object.keys(updatedField).length > 0)
        await partnerRepository.editPartner(updatedField, existingPartner._id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
