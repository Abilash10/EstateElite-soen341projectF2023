import mongoose from "mongoose";


//creating the structure of the database for a broker. Broker must enter all these informations
const BrokerSchematics = new mongoose.Schema({
    Surname: { type: String, required: true },
    Name: { type: Number, required: true },
    Email: { type: String, required: true },
    PhoneNumber:{type:String,required:true},
    CompanyName: { type: Number, required: true },
    OfficeAddress: { type: Number, required: true },
    YearsOfExperience:{type: String, required: true}
});


//Broker_Object= (name of collection in database, model name for table)
export const BrokerModel=mongoose.model("brokers",BrokerSchematics); //users is related to our collection, name of collection within database

//exporting the model so this file can be used in the brokers.js file