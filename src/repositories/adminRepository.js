import Partners from '../entities/Partners.js';

export const findAllPartners = async () =>{
    try{
        return await Partners.find().lean();
    }catch(err){
        console.log(err);
    }
}

export const findPartnerWithId = async (id) =>{
    try{
        return await Partners.findById(id);
    }catch(err){
        console.log(err)
    }
}

export const savePartner = async (partner) =>{
    try{
        return await partner.save();
    }catch(err){
        console.log(err);
    }
}