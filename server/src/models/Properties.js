import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    parking: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    pool: {
        type: Boolean,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", required: true
    },
    visitRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
});

export const PropertyModel = mongoose.model("properties", PropertySchema); //properties is related to our collection, name of collection within database