import express from "express";
import mongoose from "mongoose";
import { OfferModel } from "../models/Offers.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// Post a new offer, requested by the user in front-end (offerModal.js)
router.post("/", async (req, res) => {
  console.log("Received request body:", req.body)
  const offer = new OfferModel({
    ...req.body,  // Spread the request body to populate fields (offerCreator, property, etc.)
    _id: new mongoose.Types.ObjectId(),
    status: "pending"
  });

  try {
    const createdOffer = await offer.save();
    res.status(201).json({ createdOffer });
    console.log('Received request body:', req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all offers
router.get('/', async (req, res) => {
  try {
    const offers = await OfferModel.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export{router as offersRouter}; 