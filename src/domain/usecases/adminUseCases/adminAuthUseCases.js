export const adminAuthUseCases = (adminRepository, jwt) => ({
  adminLogin: async (email, password) => {
    try {
      const existingAdmin = await adminRepository.findAdmin(email);
      if (existingAdmin && existingAdmin.password === password) {
        const adminToken = await jwt.generateAdminToken(email);
        return { message: "Login Successfull", adminToken };
      } else throw new Error("Invalid Email or Password");
    } catch (error) {
      throw new Error(error);
    }
  },
});

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
