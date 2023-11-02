import mongoose from "mongoose";


const OfferSchema = new mongoose.Schema({
    offerCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "properties"
    },
    propertyBroker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export const OfferModel=mongoose.model("offers",OfferSchema);