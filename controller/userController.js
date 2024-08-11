import User from "../models/user.js";
import createHash from "../utils/createHash.js";
import generateToken from "../utils/userToken.js";
import bcrypt from 'bcrypt'

export const signin= async (req,res,next) => {
try{
    
    const {username,email,password,phone,role} = req.body
    const userexist = await User.findOne({email : email}) 
    if(userexist){
        return res.status(500).send("user is exists")
    }

    const hashedpassword = await createHash(password);   
    const user = new User({
        username,
        email,
        phone,
        password:hashedpassword,
        role
    })
    await user.save()
    const token = await generateToken(user.email,user.role)
    res.cookie('token',token);
    res.status(200).json({user,token,message:'signin successfull'})
    
}
catch(err){
    console.log("error ::" ,err)
    res.status(500).send('not created')
}
}
export const login = async(req,res,next)=>{
    try{
        const {email , password } = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.send('no user exists')
        }
        const checkpassword = await bcrypt.compare(password, user.password)
        if(!checkpassword){
            return res.send('password not match')
        }

        const token = await generateToken(user.email,user.role)
        res.cookie('token',token);
        res.status(200).json({email,token,message:'login successfull'})

    }
    catch(err){
        console.log('the error', err)
        res.status(500).send('cant login')
    }
};
export  const updatePassword = async(req,res,next)=>{
  try{
    const {userid} = req.params
    const {password} = req.body
    const hashedpassword = await createHash(password);
    const updateduser = await User.findByIdAndUpdate({_id : userid},{password:hashedpassword},{new:true})
    res.status(200).json(updateduser)
  }
  catch(err){
    console.log("error::",err)
  }
};
export const updateProfile = async(req,res,next)=>{
    try{
            const {userid} = req.params
            const updateduser = await User.findByIdAndUpdate({_id : userid},req.body,{new:true})
            res.status(200).json(updateduser)
    }
    catch(err){
            console.log('error::',err)
    }
}
export const deleteUser = async(req,res,next)=>{
    try{
        
            const deleted =  await User.findByIdAndDelete(req.params.userid)
             res.status(200).json({deleted,message:'deleted'})
  
    }
    catch(err){
        console.log("error::",err)
    }
  };
  export const getallUser = async(req,res,next)=>{
    try{
           const turfs = await User.find()
           res.status(200).json(turfs)
    }
    catch(err){
      console.log("erro:",err)
    }
  };
