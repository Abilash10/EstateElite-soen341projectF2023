import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js";

//json is a data type used to send data from a server to a webpage

const router=express.Router()
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user; // attach the user info to the request object
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


//get username for a specific user ID
router.get("/username/:userID",async (req,res)=>{
  console.log("username request for: " + req.params.userID);
    try{
        const user = await UserModel.findById(req.params.userID);
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
}
);

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

    const {username,password, userType}=request.body; //making API request for username and password

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
    response.json({token, userID:user._id, userType: user.userType}); //giving a specific token and user ID to the user

});

//change password
router.post("/changePassword", verifyToken, async (req, res) => {
  console.log("change password request for: " + req.user.id);
  const { newPassword } = req.body;

  if(!newPassword) {
      return res.status(400).json({ message: "New password is required!" });
  }

  try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);

      if(!user) {
          return res.status(404).json({ message: "User not found!" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password changed successfully!" });
      console.log("Password changed successfully!");
  } catch(err) {
      res.status(500).json({ message: err.message });
  }
});


export {router as userRouter};