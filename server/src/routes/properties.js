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

// Get a property by ID
router.get("/:propertyId", async (req, res) => {
  try {
    const property = await PropertyModel.findById(req.params.propertyId);
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/",async(request,response)=>{   //post request done to the server, to create a property

    try{
        const property=await PropertyModel.findById(request.body.propertyID);
        const user=await UserModel.findById(request.body.userID);
        user.savedProperties.push(property);
        await user.save();
        response.json({savedProperties:user.savedProperties});
        const receiveResponse=await property.save();
        response.json(receiveResponse);
    
    }
    
    catch(err){
    
        response.json(err);
    }

});


router.get("/savedProperties/ids",async(request,response)=>{

try
{

const user=await UserModel.findById(request.body.userID);
response.json({savedProperties:user.savedProperties});
}

catch(err)
{
    response.json(err);
}

});





export{router as propertiesRouter};