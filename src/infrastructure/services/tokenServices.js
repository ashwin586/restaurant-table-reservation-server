import Jwt from "jsonwebtoken";

export const generateUserToken = async (email) => {
  try {
    const payload = {
      email: email,
    };
    return Jwt.sign(payload, process.env.JWTSECRETKEY);
  } catch (err) {
    console.log(err);
  }
};
