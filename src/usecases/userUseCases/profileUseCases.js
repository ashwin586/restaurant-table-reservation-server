import { findUser, findWithId, saveUserProfile } from "../../repositories/userRepository.js";

export const profileFetch = async (email) =>{
    try{
        return await findUser(email);
    }catch(err){
        console.log(err);
    }
}

export const updateProfileImage = async (imageURL, id) =>{
    try{
        const user = await findWithId(id);
        if (user.accountStatus) throw new Error('Something went wrong')
        return await saveUserProfile(user, imageURL);
    }catch(err){
        throw new Error(err.message);
    }
}