import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({  //schema is an object that defines the structure of data

    username:{ type: String,  required: true, unique: true},
    password:{type: String,  required: true },
    userType:{type:String, required:true},
    savedProperties:[{type:mongoose.Schema.Types.ObjectId, ref:"properties"}],

}); 

export const UserModel=mongoose.model("users",UserSchema); //user is related to our collection

