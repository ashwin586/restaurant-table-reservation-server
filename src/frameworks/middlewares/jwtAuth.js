import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// HANDLING ADMIN TOKEN
export const generateAdminToken = async (email) => {
  try {
    return Jwt.sign(email, process.env.JWTSECRETKEY);
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
      Jwt.verify(token, process.env.JWTSECRETKEY);
      next();
    } catch (err) {
      console.log(err);
    }
  }
};

export const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization?.trim().split(" ")[1];
  try {
    Jwt.verify(token, process.env.JWTSECRETKEY, (err, decodedToken) => {
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
    return Jwt.sign(payload, process.env.JWTSECRETKEY);
  }catch(err){
    console.log(err);
  }
}

export const decodePartnerToken = async (req, res, next) => {
  try{
    const token = req.headers.authorization?.trim().split(" ")[1];
    Jwt.verify(token, process.env.JWTSECRETKEY, (err, decodedToken) => {
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
