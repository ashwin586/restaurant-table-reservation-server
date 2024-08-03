// import { findAllPartners, findPartnerWithId, savePartner } from "../../repositories/adminRepository.js";

// export const findPartners = async() =>{
//     try{
//         return await findAllPartners();
//     }catch(err){
//         console.log(err);
//     }
// }

// export const blockpartner = async (id) =>{
//     try{
//         const partner = await findPartnerWithId(id);
//         if(partner){
//             partner.accountStatus = true;
//             await savePartner(partner)
//         } else {
//             throw new Error ('Something went wrong');
//         }
//     }catch(err){    
//         console.log(err);
//         throw new Error(err.message);
//     }
// }

// export const unBlockpartner = async (id) => {
//     try{
//         const partner = await findPartnerWithId(id);
//         if(partner){
//             partner.accountStatus = false;
//             await savePartner(partner)
//         } else {
//             throw new Error ('Something went wrong');
//         }
//     }catch(err){
//         console.log(err);
//         throw new Error(err.message);
//     }
// }