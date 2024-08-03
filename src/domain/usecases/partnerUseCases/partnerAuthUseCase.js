// import {
//   findPartner,
//   savePartner,
// } from "../../repositories/partnerRepository.js";
// import { matchPassword, securePassword } from "../../services/bcrypt.js";
// import { generatePartnerToken } from "../../middlewares/jwtAuth.js";

// export const verifyRegister = async (data) => {
//   try {
//     const existingPartner = await findPartner(data.phoneNumber);
//     if (existingPartner)
//       throw new Error("This Phone Number is already registered");
//     const hashedPassword = await securePassword(data.password1);
//     return await savePartner(data, hashedPassword);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// export const verifyLogin = async (data) => {
//   try {
//     const existingPartner = await findPartner(data.phoneNumber);
//     if (!existingPartner) throw new Error("invalid Phone number or password");
//     const passwordCheck = await matchPassword(
//       data.password,
//       existingPartner.password
//     );
//     if (passwordCheck) {
//       const partnerToken = await generatePartnerToken(data.phoneNumber);
//       return partnerToken;
//     } else {
//       throw new Error("Invalid Phone number or password");
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// export const recoverpassword = async (number) => {
//   try {
//     return await generatePartnerToken(number);
//   } catch (err) {
//     console.log(err);
//   }
// };
