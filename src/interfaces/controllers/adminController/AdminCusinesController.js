import { addingCuisine, deletecuisine, findallcuisines } from "../../../usecases/adminUseCases/adminCuisineUseCases.js";

export const addCusines = async (req, res) => {
  try {
    const { values } = req.body;
    const result = await addingCuisine(values.cuisine);
    return res.status(200).json({result});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
};

export const findAllCuisines = async (req, res) => {
  try{
    const result = await findallcuisines();
    return res.status(200).json({result});
  }catch(err){
    console.log(err);
  }
}

export const deleteCuisine = async (req, res) => {
  try{
    const {id} = req.body;
    const result = await deletecuisine(id)
    return res.status(200).json({result});
  }catch(err){
    console.log(err);
  }
}