import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { LoginSchema, RegisterSchema } from "./auth.validation.js";
import { sendEmail } from "../../Utils/sendemail.js";
export const Register = async (req,res)=>{
    try{
        const {userName,email,password,age,gender} = req.body;
        const user = await userModel.findOne({email});
        if(user){
          return res.status(409).json({message:"email exits"});
        }
        const validationResult = await RegisterSchema.body.validate(req.body,{abortEarly:false});
        const passwordHashed = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
        await userModel.create({userName:userName,email,age,password: passwordHashed,age,gender});
        const html = `
        <div>
        <p>Dear: ${userName}</p>
        <h1 style = 'background-color:teal>Welcome to our site</h1>
        <h2>New Account Created</h2>
        <p>Thanks for joining us</p>
        </div> `
        
        sendEmail(email,'welcome',html);
        
        
        return res.status(201).json({message:"success",user});
        
     }catch(error){
       return res.status(500).json({message:"catch error",error});
     }
}

export const Login = async(req,res)=>{
 const {email,password} = req.body;
 const user = await userModel.findOne({email});
 if (!user){
  return nextTick(new Error("user not found"));
 }
 const check = await bcrypt.compareSync(password,user.password);
 if(!check){
  return res.status(400).json({message:"invalid password"});
 }
 const token = await jwt.sign({id:user._id},process.env.LOGINSIGNTURE,{expiresIn: '2h'});
 return res.status(200).json({message:"success",token});
}

export const allUsers = async (req,res)=>{
  try{
    const users = await userModel.find.select('userName');

  }catch(error){

  }
}