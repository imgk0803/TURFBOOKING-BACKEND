import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const key = process.env.JWT_KEY


export const authAdmin= (req,res,next)=>{
   const token = req.cookies.token
   jwt.verify(token, key , function(err, decoded) {
    if(err){
        console.log('error',err)
        return res.status(401).send('not verified')
    }
    req.user = decoded
    console.log(req.user.role)
    if (req.user.role !== "admin") {
        return res.send("not authenticated");
      }
      next();
  });

}

