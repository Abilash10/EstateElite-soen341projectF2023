import express from "express";
import mongoose from "mongoose";
import { PropertyModel } from "../models/Properties.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await PropertyModel.find({});
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new property
router.post("/", verifyToken, async (req, res) => {
  console.log("Received request body:", req.body)
  const property = new PropertyModel({
    ...req.body,  // Spread the request body to populate fields (address, price, etc.)
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    const createdProperty = await property.save();
    res.status(201).json({ createdProperty });
    console.log('Received request body:', req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search properties by address
router.get("/search/:address", async (req, res) => {
  console.log("Search request received for address:", req.params.address);
  try {
    const addressRegex = new RegExp(req.params.address, 'i'); // Create a case-insensitive regex
    const properties = await PropertyModel.find({ address: addressRegex });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a property by ID
router.get("/:propertyId", async (req, res) => {
  try {
    const property = await PropertyModel.findById(req.params.propertyId);
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
});

// endpoint to ensure we can delete properties
router.delete("/:propertyId", async (req, res) => {
  try {
    const property = await PropertyModel.findByIdAndDelete(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully", property });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a property visitrequest with the requesting userID by property ID
router.post("/:propertyId/requestVisit", verifyToken, async (req, res) => {
  console.log("Received visit request body:", req.body)
  try {
    const property = await PropertyModel.findById(req.params.propertyId);
    property.visitRequests.push(req.body.userID);
    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API endpoint to edit the price of properties
router.put('/:propertyId', async (req, res) => {
  try {
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      req.params.propertyId,
      { price: req.body.price },
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put("/", async (request, response) => {   //post request done to the server, to create a property

  try {
    const property = await PropertyModel.findById(request.body.propertyID);
    const user = await UserModel.findById(request.body.userID);
    user.savedProperties.push(property);
    await user.save();
    response.json({ savedProperties: user.savedProperties });
    const receiveResponse = await property.save();
    response.json(receiveResponse);

  }

  catch (err) {

    response.json(err);
  }

});


router.get("/savedProperties/ids", async (request, response) => {

  try {

    const user = await UserModel.findById(request.body.userID);
    response.json({ savedProperties: user.savedProperties });
  }

  catch (err) {
    response.json(err);
  }

});

export { router as propertiesRouter };