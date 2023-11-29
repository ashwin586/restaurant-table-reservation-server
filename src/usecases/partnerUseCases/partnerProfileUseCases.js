import {
  findPartner,
  partnerSave,
} from "../../repositories/partnerRepository.js";
import { securePassword } from "../../services/bcrypt.js";

export const fetchPartner = async (number) => {
  try {
    return await findPartner(number);
  } catch (err) {
    console.log(err);
  }
};

export const editPartner = async (data, number) => {
  try {
    const hashedPassword = await securePassword(data.passwordone);
    const response = await partnerSave(data, number, hashedPassword);
    if (response) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};
