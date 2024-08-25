import jwt from 'jsonwebtoken';
export const auth = (req,res,next)=>{
    try{
    const { autharization } = req.headers;
    if (autharization.startwith(process.env.BEARERTOKEN)){
        return res.status(400).json({ message: "invalid token" });
    }

    const token = autharization.split(process.env.BEARERTOKEN)(1);
    const decoded = jwt.verify(token, process.env.LOGINSIGNTURE);
    if (!decoded) {
        return res.status(400).json({ message: "invalid token" });
    }
    
    req.id = decoded.id;
    next();}
    catch(error){
        return res.status(500).json({message:"catch error",error:error.stack});

    }
}