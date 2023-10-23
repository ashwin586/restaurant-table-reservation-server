import {
  fetchRestaurants,
  list,
  unlist,
} from "../../../usecases/adminUseCases/adminRestaurantUseCases.js";

export const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await fetchRestaurants();
    return res.status(200).json(restaurants);
  } catch (err) {
    console.log(err);
  }
};

export const unlistRestaurant = async (req, res) => {
  try {
    const { id } = req.body;
    await unlist(id);
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

export const listRestaurant = async (req, res) => {
  try {
    const { id } = req.body;
    await list(id);
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};
