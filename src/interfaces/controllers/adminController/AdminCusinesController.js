import { addingCuisine } from "../../../usecases/adminUseCases/adminCuisineUseCases.js";

export const addCusines = async (req, res) => {
  try {
    const { values } = req.body;
    await addingCuisine(values.cuisine);
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};
