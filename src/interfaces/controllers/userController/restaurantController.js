import { fetchRestaurant } from "../../../usecases/userUseCases/restaurantUseCases.js";

export const findRestaurant = async (req, res) => {
  try {
    const result = await fetchRestaurant(req.query.id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};
