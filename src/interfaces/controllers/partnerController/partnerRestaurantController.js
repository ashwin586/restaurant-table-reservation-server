import {
  allCuisines,
  alterRestaurant,
  newRestaurant,
  partnerRestaurant,
} from "../../../usecases/partnerUseCases/partnerRestaurantUseCases.js";

export const createRestaurant = async (req, res) => {
  try {
    const { number } = req.token;
    await newRestaurant(req.body, number);
    return res.status(200).end();
  } catch (err) {
    console.log(err);
  }
};

export const fetchingCuisines = async (req, res) => {
  try {
    const result = await allCuisines();
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }
};

export const fetchRestaurant = async (req, res) => {
  try {
    const result = await partnerRestaurant(req.token.number);
    if (result.length) {
      return res.status(200).json(result);
    } else {
      throw new Error("Cant find restaurants for this partner");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message }); 
  }
};

export const editRestaurant = async (req, res) => {
  try {
    const result = await alterRestaurant(req.body.values);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
