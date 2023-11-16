import { getAllOrders } from "../../../usecases/partnerUseCases/partnerOrdersUseCases.js";

export const fetchAllOrders = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getAllOrders(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};
