import bcrypt from 'bcrypt';

export const securePassword = async(password) =>{
    return await bcrypt.hash(password, 10)
}

export const matchPassword = async(passwordOne, passwordTwo) =>{
    return await bcrypt.compare(passwordOne, passwordTwo);
}