import userModel from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try{
       const existingUser = await userModel.findOne({$or: [{username}, {email}]});

       if(existingUser){
        return res.status(400).json({message: "Username or email already exists"});
       }

       const bcryptedPassword = await bcrypt.hash(password, 10);

       const user = await userModel.create({username, email, password: bcryptedPassword});

       const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});

       res.cookie('token', token);

       res.status(201).json({message: "User registered successfully", user:{
        id: user._id,
        username: user.username,
        email: user.email
       }});
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const loginUser = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try{

        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie('token', token);

        res.status(200).json({message: "User logged in successfully", user:{
            id: user._id,
            username: user.username,
            email: user.email
        }});
    } catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}