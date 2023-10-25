import express from "express";
import mongoose from "mongoose";
import { PropertyModel } from "../models/Properties.js";

const router=express.Router();

router.get("/",async(request,response)=>{   //get request done to the server

try{

const receiveResponse=await PropertyModel.find({});
response.json(receiveResponse);

}

catch(err)
{

    response.json(err);

}
});


router.post("/",async(request,response)=>{   //post request done to the server, to create a property

    const property=new PropertyModel(request.body); //sending all information of the body to the server
    
    try{
    
    const receiveResponse=await property.save();
    response.json(receiveResponse);
    
    }
    
    catch(err){
    
        response.json(err);
    }

});


router.put("/",async(request,response)=>{   //post request done to the server, to create a property

    try{
        const property=await PropertyModel.findById(req.body.propertyID);
        const user=await PropertyModel.findById(req.body.userID);
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

const user=await UserModel.findById(req.body.userID);
response.json({savedProperties:user.savedProperties});
}

catch(err)
{
    response.json(err);
}

});





export{router as propertiesRouter};