import mongoose from "mongoose";


const PropertySchema=new mongoose.Schema({  //schema is an object that defines the structure of data

    Overview:
    {
        type:String,
        required:true,
    },
Address:{ type:String, required:true, },
NumberOfBedrooms:{type:Number,required:true},
NumberOfBathrooms:{type:Number,required:true},
Parking:{type:String,required:true},
imageUrl:{type:String,required:true},
userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
}); 

export const PropertyModel=mongoose.model("properties",PropertySchema); //properties is related to our collection, name of collection within database


