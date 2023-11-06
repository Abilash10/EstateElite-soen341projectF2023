import mongoose from "mongoose";


//creating the structure of the database for a broker. Broker must enter all these informations
const BrokerSchematics = new mongoose.Schema({
    surname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    companyName: { type: String, required: true },
    officeAddress: { type: String, required: true },
    yearsOfExperience:{type: Number, required: true},
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});


//Broker_Object= (name of collection in database, model name for table)
export const BrokerModel=mongoose.model("brokers",BrokerSchematics); //users is related to our collection, name of collection within database

//exporting the model so this file can be used in the brokers.js file