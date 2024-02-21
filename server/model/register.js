import mongoose from "mongoose";
const registerschema = mongoose.Schema({
    name : String,
    email : String , 
    password : String
})

export const registermodel = mongoose.model('register' , registerschema);