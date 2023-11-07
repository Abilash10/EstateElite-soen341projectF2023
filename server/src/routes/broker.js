import express from "express";
import mongoose from "mongoose";
import { BrokerModel } from "../models/Broker.js";
import { verifyToken } from "./users.js";


// a router allows you to define specific actions for different URL paths.
// basically manages and defines routes for web applications
// the router directs the request to the appropriate route 

const router=express.Router(); //creating an instance of a Express Router. 


router.get("/", async (req, res) => {
  try {
    const broker = await BrokerModel.find({});
    res.status(200).json(broker);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", verifyToken, async (req, res) => {
  console.log("Received request body:", req.body)
  const broker = new BrokerModel({
    ...req.body,  // Spread the request body to populate fields (address, price, etc.)
    _id: new mongoose.Types.ObjectId(),
  });

  console.log("Succesfully modelled");

  const brokerId=req.user.id;
  let tempBroker=await BrokerModel.findById(brokerId);

  try {
    tempBroker=broker;
    const createdBroker = await tempBroker.save();
    res.status(201).json({ createdBroker });
    console.log('Saved request body:', req.body);
  } catch (err) {
    res.status(500).json(err);
    console.error('Error saving broker:', err);
  }
});



router.get("/search/:Name", async (req, res) => {
    console.log("Search request received for Broker Name:", req.params.Name);
    try {
      const NameRegex = new RegExp(req.params.Name, 'i'); // Create a case-insensitive regex
      const broker = await BrokerModel.find({ name:NameRegex });//searches in the database
      res.status(200).json(broker);//returns the Broker if it's successful
    } catch (err) {
      res.status(500).json(err);//returns an error
      console.error('Error saying broker:',err);
    }
  });


export {router as brokerRouter};    //exporting the router object to index.js file