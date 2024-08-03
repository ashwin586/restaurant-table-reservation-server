import { userRepository } from "../../../infrastructure/repositories/userRepository.js";
import { userRepositoryInterface } from "../../../domain/repositories/userRepository.js";
import { userRestaurantUseCases } from "../../../domain/usecases/userUseCases/restaurantUseCases.js";

const userRepositoryInstance = userRepositoryInterface(userRepository);
const userRestaurantUseCaseInstance = userRestaurantUseCases(
  userRepositoryInstance
);


export const userRestaurantControllers = {
  findAllRestaurants: async (req, res) => {
    try {
      const response =
        await userRestaurantUseCaseInstance.fetchAllRestaurants();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },

  findRestaurant: async (req, res) => {
    try {
      const result = await userRestaurantUseCaseInstance.fetchRestaurant(
        req.query.id
      );
      if (result) {
        return res.status(200).json({
          restaurant: result.restaurantDetails,
          menus: result.menus,
          reviews: result.reviews,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
