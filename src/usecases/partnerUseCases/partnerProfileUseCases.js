import {
  findPartner,
  partnerSave,
} from "../../repositories/partnerRepository.js";

export const fetchPartner = async (number) => {
  try {
    return await findPartner(number);
  } catch (err) {
    console.log(err);
  }
};

export const editPartner = async (data, number) => {
  try {
    const response = await partnerSave(data, number);
    console.log(response);
    if (response) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};
