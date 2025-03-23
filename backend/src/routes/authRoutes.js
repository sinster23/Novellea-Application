import express from 'express';
import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken=(userId)=>{
   return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"});
}

router.post("/register", async(req, res) => {
    try{
        const {email,username,password}=req.body;
        if(!email || !username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters long"});
        }
        if(username.length<3){
            return res.status(400).json({message:"Username must be atleast 3 characters long"});
        }

        const existingEmail= await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({message:"An account with this email already exists"});
        }
        const existingUsername= await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({message:"An account with this username already exists"});
        }

        const profileImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;

        const user= new User({
            email,
            username,
            password,
            profileImage,
        })

        await user.save();

        const token=generateToken(user._id);
        res.status(201).json({
            user:{
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
        },token});
    }catch(err){
        console.log("Error in register route",err);
        res.status(500).json({message:"Something went wrong"});
    }
});
router.post("/login", async(req, res) => {
    try{
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect= await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=generateToken(user._id);
        res.status(200).json({
            user:{
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
        },token});
    }catch(err){
        console.log("Error in login route",err);
        res.status(500).json({message:"Something went wrong"});
    }
});

export default router;