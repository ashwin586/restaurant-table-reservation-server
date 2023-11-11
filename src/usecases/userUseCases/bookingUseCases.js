import {
  findUser,
  inventoryManagment,
  saveBooking,
} from "../../repositories/userRepository.js";

export const tableReservation = async (data, userEmail) => {
  try {
    const user = await findUser(userEmail);
    const userId = user._id;
    await inventoryManagment(data.cart);
    const grantTotal = data.cart.reduce((total, item) => total + item.total, 0);
    await saveBooking(userId, data, grantTotal);
    return true;
  } catch (err) {
    console.log(err);
  }
};
