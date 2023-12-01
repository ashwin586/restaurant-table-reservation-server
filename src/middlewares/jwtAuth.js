import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// HANDLING ADMIN TOKEN
export const generateAdminToken = async (email) => {
  try {
    return Jwt.sign(email, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4');
  } catch (err) {
    console.log(err);
  }
};

export const adminCheck = async (req, res, next) => {
  const token = req.headers.authorization?.trim().split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorised Access" });
  } else {
    try {
      Jwt.verify(token, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4');
      next();
    } catch (err) {
      console.log(err);
    }
  }
};

// HANDLING USER TOKEN
export const generateUserToken = async (email) => {
  try {
    const payload = {
      email: email,
    };
    return Jwt.sign(payload, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4');
  } catch (err) {
    console.log(err);
  }
};

export const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization?.trim().split(" ")[1];
  try {
    Jwt.verify(token, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized Access" });
      }
      req.token = decodedToken;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

// HANDLING PARTNER TOKEN
export const generatePartnerToken = async (number) =>{
  try{
    const payload = {
      number: number
    }
    return Jwt.sign(payload, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4');
  }catch(err){
    console.log(err);
  }
}

export const decodePartnerToken = async (req, res, next) => {
  try{
    const token = req.headers.authorization?.trim().split(" ")[1];
    Jwt.verify(token, '5f7Jp2Rt9QcXnYzA8sEw6vGhKuLmW3oV1iBd4', (err, decodedToken) => {
      if(err){
        return res.status(401).json({message: 'Unauthorized Access'})
      }
      req.token = decodedToken;
      next();
    })
  }catch(err){
    console.log(err);
  }
}
