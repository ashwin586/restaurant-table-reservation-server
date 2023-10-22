import { fetchPartner } from "../../../usecases/partnerUseCases/partnerProfileUseCases.js";

export const getPartner = async (req, res) => {
  try {
    const { number } = req.token;
    const partner = await fetchPartner(number);
    return res.status(200).json({partner});
  } catch (err) {
    console.log(err);
  }
};
