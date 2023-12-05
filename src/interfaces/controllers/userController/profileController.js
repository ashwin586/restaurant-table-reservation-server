import { profileFetch, updateProfileImage } from "../../../usecases/userUseCases/profileUseCases.js";

export const fetchProfile = async (req, res) =>{
    try{
        const {email} = req.token;
        const userProfile = await profileFetch(email)
        return res.status(200).json({userData: userProfile});
    }catch(err){
        console.log(err);
    }
}

export const userImage = async (req, res) =>{
    try{
        const {imageURL,  userId} = req.body
        await updateProfileImage(imageURL, userId)
        return res.status(200).end();
    }catch(err){
        return res.status(400).json(err.message);
    }
}