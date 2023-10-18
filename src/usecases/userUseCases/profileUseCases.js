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
        return await saveUserProfile(user, imageURL);

    }catch(err){
        console.log(err);
    }
}