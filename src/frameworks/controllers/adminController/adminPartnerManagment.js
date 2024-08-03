// import {
//   blockpartner,
//   findPartners,
//   unBlockpartner,
// } from "../../../usecases/adminUseCases/adminPartnerUseCases.js";

// export const getPartners = async (req, res) => {
//   try {
//     const response = await findPartners();
//     return res.json(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const blockPartner = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await blockpartner(id);
//     return res.status(200).end();
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ message: err.message });
//   }
// };

// export const unbockPartner = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await unBlockpartner(id);
//     return res.status(200).end();
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ message: err.message });
//   }
// };
