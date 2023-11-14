import { getAllOrders } from "../../../usecases/partnerUseCases/partnerOrdersUseCases.js";

export const fetchAllOrders = async (req, res) => {
  try {
    const number = req.token.number;
    const reuslt = await getAllOrders(number);
  } catch (err) {
    console.log(err);
  }
};
