import connectdb from "../DB/connection.js";
import auth from "../src/modules/auth/auth.router.js";
import { sendEmail } from "./Utils/sendemail.js";

export const initApp = (app,express)=>{
    connectdb();
    app.use(express.json());
    app.use('/userauth',auth);
    app.use('*',(req,res) =>{
        return res.status(404).json({message:"page not found"});
    })
}