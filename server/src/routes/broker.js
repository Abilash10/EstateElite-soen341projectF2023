import express from "express";
import mongoose from "mongoose";
import { BrokerModel } from "../models/Broker.js";

// a router allows you to define specific actions for different URL paths.
// basically manages and defines routes for web applications
// the router directs the request to the appropriate route 

const router=express.Router(); //creating an instance of a Express Router. 

router.get("/search/:Name", async (req, res) => {
    console.log("Search request received for Broker Name:", req.params.Name);
    try {
      const NameRegex = new RegExp(req.params.Name, 'i'); // Create a case-insensitive regex
      const broker = await BrokerModel.find({ Name:NameRegex });//searches in the database
      res.status(200).json(broker);//returns the Broker if it's successful
    } catch (err) {
      res.status(500).json(err);//returns an error
    }
  });


  router.post("/editProfile",async(request,response)=>{

    const {Surname,Name,Email,PhoneNumber,CompanyName,OfficeAddress,YearsOfExperience}=request.body; //making API request for username and password

    const BrokerInfo=new BrokerModel(Surname,Name,Email,PhoneNumber,CompanyName,OfficeAddress,YearsOfExperience);

    await BrokerInfo.save();   //saving user info in database

    response.json({message:"Broker information has been completed succesfully"});


});


  //router.post("/broker,",async(request,response)=>








export {router as brokerRouter};    //exporting the router object to index.js file