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

// Update the status of an offer to accepted or denied
router.put("/:offerId", verifyToken, async (req, res) => {
  const { status } = req.body; // This should be 'accepted' or 'denied'
  const { offerId } = req.params;

  // Validate the status
  if (!['Accepted', 'Rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedOffer = await OfferModel.findByIdAndUpdate(
      offerId,
      { status: status },
      { new: true } // This returns the updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json(updatedOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an offer by ID
router.delete("/:offerId", verifyToken, async (req, res) => {
  const { offerId } = req.params;

  try {
    const offer = await OfferModel.findById(offerId);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Check if the requesting user is the offer creator or has the right to delete the offer
    if (offer.offerCreator.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized to delete this offer" });
    }

    await OfferModel.findByIdAndDelete(offerId);
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export { router as offersRouter }; 