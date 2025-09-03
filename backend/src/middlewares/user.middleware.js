import config from '../config/config.js';
import jwt from 'jsonwebtoken'

const isAuthenticated = async(req,res,next)=>{
    try{

        const token = req.cookies?.token;
        console.log("TOKEN:", token);
        if(!token){
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            })
        }

        const decoded =  jwt.verify(token,config.JWT_SECRET);
        console.log("Decoded JWT:", decoded);

        if(!decoded){
            return res.status(401).json({
                message:'invalid token',
                success:false,
            })
        }
        req.user = { _id: decoded.userId}
        next();
    }
    catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({
        message: "Authentication failed",
        error: err.message,
        success: false
    });
}

}
export default isAuthenticated;

