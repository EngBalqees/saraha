import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
export const Register = async (req,res)=>{
    try{
        const {userName,email,password,age,gender} = req.body;
        const passwordHashed = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
        const user = await userModel.create({userName:userName,email,age,password: passwordHashed,age,gender});
        
        return res.status(201).json({message:"success",user});
     }catch(error){
       return res.status(500).json({message:"catch error",error});
     }
}

export const Login = async(req,res)=>{
 const {email,password} = req.body;
 const user = await userModel.findOne({email});
 if (!user){
  return res.status(404).json({message:"email not found"});
 }

 const check = await bcrypt.compareSync(password,user.password);
 if(!check){
  return res.status(400).json({message:"invalid password"});
 }
 const token = await jwt.sign({id:user._id},process.env.LOGINSIGNTURE,{expireIn:'2h'});
 return res.status(200).json({message:"success",token});
}