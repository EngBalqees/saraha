
import mongoose from "mongoose";

const connectdb = ()=>{
    return mongoose.connect(process.env.DbConnection).then(result=>{
        console.log(`db connection established`);
      }).catch(err =>{
        console.log(`error to connect db: ${err}`);
      })
    }
    export default connectdb;
