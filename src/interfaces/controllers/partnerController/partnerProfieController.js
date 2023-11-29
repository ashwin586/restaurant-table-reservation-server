import {
  editPartner,
  fetchPartner,
} from "../../../usecases/partnerUseCases/partnerProfileUseCases.js";

export const getPartner = async (req, res) => {
  try {
    const { number } = req.token;
    const partner = await fetchPartner(number);
    return res.status(200).json({ partner });
  } catch (err) {
    console.log(err);
  }
};

export const partnerEditController = async (req, res) => {
  try {
    const number = req.token.number;
    const result = await editPartner(req.body, number);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
