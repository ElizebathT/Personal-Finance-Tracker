const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler=require("express-async-handler")
require("dotenv").config()
const userController={
    register : asyncHandler(async(req,res)=>{        
        const { username, email, password } = req.body;
        const userExits=await User.findOne({username})
        if(userExits){
            throw new Error("User already exists")
        }
        const hashed_password=await bcrypt.hash(password,10)
        const userCreated=await User.create({
            username,
            email,
            password:hashed_password
        })
        if(!userCreated){
            throw new Error("User creation failed")
        }
        const payload={
            email:userCreated.email,
            id:userCreated.id
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie("token",token,{
            maxAge:2*24*60*60*1000,
            http:true,
            sameSite:"none",
            secure:false
        })
        res.send("User created successfully")
    }),

    googleRegister : asyncHandler(async(req,res)=>{        
        const email=req.user.emails[0].value
        const name = req.user.displayName;
        const userExits=await User.findOne({email})
        if(!userExits){
            
        const userCreated=await User.create({        
            email,
            username:name
        })
        if(!userCreated){
            throw new Error("User creation failed")
        }
        const payload={
            email:userCreated.email,
            id:userCreated.id
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie("token",token,{
            maxAge:2*24*60*60*1000,
            http:true,
            sameSite:"none",
            secure:false
        })
    }
        res.send("User created successfully")
    }),
    
    login :asyncHandler(async(req,res)=>{
        const {email,password}=req.body
        const userExist=await User.findOne({email})
        if(!userExist){
            throw new Error("User not found")
        }
        const passwordMatch=await bcrypt.compare(password,userExist.password)
        if(!passwordMatch){
            throw new Error("Passwords not matching")
        }
        const payload={
            email:userExist.email,
            id:userExist.id
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie("token",token,{
            maxAge:2*24*60*60*1000,
            sameSite:"none",
            http:true,
            secure:false
        })        
        res.send("Login successful")
        }),

    getUserProfile : asyncHandler(async (req, res) => {
            const userId = req.user.id;         
            const user = await User.findById(userId).select("-password"); 
            if (!user) {
                throw new Error("User not found");
            }        
            res.send({
                message: "User details retrieved successfully",
                user
            });
        }),

    logout:asyncHandler(async(req,res)=>{
        res.clearCookie("token")
        res.send("User logged out")
        }),

    profile:asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        const userId = req.user.id; 
        const user = await User.findOne({_id:userId});
        if (!user) {
            throw new Error("User not found");
        }       
        let hashed_password = user.password; 
        if (password) {
            hashed_password = await bcrypt.hash(password, 10);
        }            
        user.username = username || user.username;
        user.password = hashed_password;           
        const updatedUser = await user.save();            
        if(!updatedUser){
            throw new Error('Error in updating')
        }
        res.send("Update saved");
     }),
    
}
module.exports=userController