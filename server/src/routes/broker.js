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

// Post a new broker, requested by the user in front-end (brokerModal.js)
//However, if the user broker already exists, it will update the broker information instead of creating a new one
router.post("/", async (req, res) => {
  console.log("Received request body:", req.body);

  const brokerData = {
    ...req.body,  // Spread the request body to populate fields (brokerCreator, property, etc.)
  };

  try {
    const updatedBroker = await BrokerModel.findOneAndUpdate(
      { userOwner: brokerData.userOwner }, // assuming brokerCreator is the unique identifier
      brokerData,
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ updatedBroker });
    console.log('Received request body:', req.body);
  } catch (err) {
    res.status(500).json(err);
    console.log('Error saying broker:',err)
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