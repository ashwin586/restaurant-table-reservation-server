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

export const generatePartnerToken = async (number) => {
  try {
    const payload = {
      number: number,
    };
    return Jwt.sign(payload, process.env.JWTSECRETKEY);
  } catch (err) {
    console.log(err);
  }
};