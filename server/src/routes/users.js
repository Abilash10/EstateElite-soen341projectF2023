import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js";

//json is a data type used to send data from a server to a webpage

const router=express.Router()


router.post("/register",async(request,response)=>{

    const {username,password,userType}=request.body; //making API request for username and password

    const user=await UserModel.findOne({username:username}) ;  //confirming user name exists and if that's the case, we're asigning a user object 

    if(user)
    {
        return response.json({message:" This username already exists. Please enter a different username! "})
    }

    const hashedPassword=await bcrypt.hash(password,10); // hashing the password

    const newUser=new UserModel({username,password:hashedPassword,userType}); //creating a new user
    await newUser.save();   //saving user info in database

    response.json({message:"User registration has been completed succesfully"});


});



router.post("/login",async (request,response)=>{

    const {username,password}=request.body; //making API request for username and password

    const user=await UserModel.findOne({username:username}) ; //checking is username is existant and if that's the case, we're assigning it a user object

    if(!user){

        return response.json({message:"User is non-existent!"});

    }

    //hashing the current password @ login and see if it matches with the hashed password in the database
    const passwordValidation=await bcrypt.compare(password,user.password);

    if(!passwordValidation){ //veryfing is the password is valid

        return response.json({message:"The username or pasword is incorrect!"});
    }

    const token=jwt.sign({id:user._id},"secret");   //creating an API authentication
    response.json({token, userID:user._id}); //giving a specific token and user ID to the user

});

export {router as userRouter};