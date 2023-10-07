import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    phoneNumber: {
        type:Number,
        required:true,
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountStatus: {
        type:Boolean,
        default:false
    },
    userImage:{
        type:String
    },
    registerDate: {
        type:String,
        default:Date.now()
    }
})

export default mongoose.model("users", userSchema);