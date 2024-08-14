import { createPartner } from "../../entities/partners.js";

export const partnerAuthUseCases = (partnerRepository, bcrypt, jwt) => ({
  registerPartner: async (data) => {
    try {
      const existingPartner = await partnerRepository.findPartner(
        data.phoneNumber
      );
      if (existingPartner)
        throw new Error("Partner already registered with this Phone Number");
      const partner = createPartner(data);
      partner.password = await bcrypt.securePassword(data.password);
      return await partnerRepository.savePartner(partner);
    } catch (error) {
      throw new Error(error);
    }
  },

  loginPartner: async (data) => {
    try {
      const existingPartner = await partnerRepository.findPartner(
        data.phoneNumber
      );

      const passwordCheck = await bcrypt.matchPassword(
        data.password,
        existingPartner.password
      );

      if (passwordCheck || existingPartner)
        return await jwt.generatePartnerToken(data.phoneNumber);
      else throw new Error("Incorrect Phone number or password");
    } catch (error) {
      throw new Error(error);
    }
  },

  recoverPassword: async (data) => {
    try {
      return await jwt.generatePartnerToken(data);
    } catch (error) {
      throw new Error(error);
    }
  },
});
