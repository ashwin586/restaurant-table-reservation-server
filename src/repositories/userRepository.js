import user from '../entities/user.js'

export const saveUser = async (userData) =>{
    try{
        const newUser = new user({
            name: userData.name,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: userData.password
        })
        return await newUser.save();
    }catch(err){
        console.log(err)
    }
}

export const findUser = async(email) => {
    try{
        const result = await user.findOne({email: email});
        return result
    }catch(err){
        console.log(err)
    }
}

export const savenewpassword = async (password, userData) => {
    try{
        userData.password = password;
        return await userData.save();
    }catch(err){
        console.log(err)
    }
}