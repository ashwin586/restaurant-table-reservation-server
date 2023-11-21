import { fetchRestaurant } from "../../../usecases/userUseCases/restaurantUseCases.js";

export const findRestaurant = async (req, res) => {
  try {
    const result = await fetchRestaurant(req.query.id);
    if (result) {
      return res
        .status(200)
        .json({ restaurant: result.restaurantDetails, menus: result.menus, reviews: result.reviews });
    }
  } catch (err) {
    console.log(err);
  }
};
