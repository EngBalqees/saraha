import mongoose, { Schema , model, Types  } from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
 userName:{
    type: String,
    required:true,
 },
 email:{
    type: String,
    required:true,
 },
 password:{
    type: String,
    required:true,
 },
 age:{
    type:Number,
 },
 gender:{
    type:String,
    enum:['Male','Female'],
 },
 confirmEmail:{
    type:Boolean,
    default:false,
 }
},{
    timestamps:true,
});

const userModel = mongoose.model('User',UserSchema);
export default userModel;