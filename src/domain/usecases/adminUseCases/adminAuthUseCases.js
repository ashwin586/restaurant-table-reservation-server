// import dotenv from "dotenv";
// import { generateAdminToken } from "../../middlewares/jwtAuth.js";
// // import { findPartners } from "./adminPartnerUseCases.js";
// import { findAdmin, saveNewAdmin } from "../../repositories/adminRepository.js";
// dotenv.config();

// export const adminLoginVerify = async (email, password) => {
//   try {
//     const existingAdminCheck = await findAdmin(email);
//     if (existingAdminCheck && existingAdminCheck.password === password) {
//       const adminToken = await generateAdminToken(email);
//       return { message: "Login Successfull", status: 200, adminToken };
//     } else {
//       throw new Error("Invalid email or password");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// export const adminCreate = async (data) => {
//   try {
//     const existingPartner = await findAdmin(data.email);
//     if (existingPartner) {
//       throw new Error("This Admin email already exists");
//     } else {
//       const response = await saveNewAdmin(data);
//       if (response) return true;
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error(err.message);
//   }
// };
