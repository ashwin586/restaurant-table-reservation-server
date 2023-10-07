import user from "../../entities/user.js";

export const findAllUsers = async () => {
  try {
    return await user.find().lean();
  } catch (err) {
    console.log(err);
  }
};

export const blockuser = async (id) => {
  try {
    const User = await user.findByIdAndUpdate(
      id,
      { accountStatus: true },
      { new: true }
    );
    return User;
  } catch (err) {
    console.log(err);
  }
};

export const unblockuser = async (id) => {
  try {
    return await user.findByIdAndUpdate(
      id,
      { accountStatus: false },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};
