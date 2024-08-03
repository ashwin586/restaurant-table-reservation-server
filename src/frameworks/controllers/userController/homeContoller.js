import { fetchAllRestaurants } from "../../../domain/usecases/userUseCases/homeUseCases.js";

export const findAllRestaurants = async (req, res) => {
  try {
    const result = await fetchAllRestaurants();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};
