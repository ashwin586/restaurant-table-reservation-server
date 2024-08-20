// import {
//   adminCreate,
//   adminLoginVerify,
// } from "../../../usecases/adminUseCases/adminAuthUseCases.js";

import { adminRepositoryInterface } from "../../../domain/repositories/adminRepository.js";
import { adminAuthUseCases } from "../../../domain/usecases/adminUseCases/adminAuthUseCases.js";
import { adminRepository } from "../../../infrastructure/repositories/adminRepository.js";
import * as jwt from "../../../infrastructure/services/tokenServices.js";

const adminRepositoryInstance = adminRepositoryInterface(adminRepository);
const adminAuthUseCasesInstance = adminAuthUseCases(
  adminRepositoryInstance,
  jwt
);

export const adminAuthControllers = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const response = await adminAuthUseCasesInstance.adminLogin(
        email,
        password
      );
      return res
        .status(200)
        .json({ message: response.message, adminToken: response.adminToken });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  },
};

// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const result = await adminLoginVerify(email, password);
//     if (result.status == 200) {
//       return res
//         .status(200)
//         .json({ message: result.message, adminToken: result.adminToken });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// export const adminSignUp = async (req, res) => {
//   try {
//     const result = await adminCreate(req.body);
//     if (result) {
//       return res.status(200).end();
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };
