import mongoose from "mongoose";
import Court from "../models/court.js";
import Turf from "../models/turf.js";
import User from "../models/user.js";

export const addcourt =  async(req,res,next)=>{
    try{
          const{turfid} = req.params
          const court = new Court({
            ...req.body,
            turf : turfid,
          })
          await court.save()
          await Turf.findByIdAndUpdate(turfid,{$push:{court:court._id}},{new:true})
          res.status(200).json(court)

    }
    catch(err){    
      
      console.log('error',err)
    }
};
export const getCourts = async(req,res,next)=>{
  try{
        const{turfid} = req.params
        const turf = await  Turf.findById(turfid).populate({path:'court',
           populate : {
            path :'timeslot',
            model:'Court'
           }
        }).exec();
        res.json({turf,message:'fetched'})
  }
  catch(err){
    console.log("error:",err)
  }
};
export const updateCourt= async(req,res,next)=>{
  try{
            
           const multipleCourts = await Court.find({turf:req.params.turfid})
           console.log(multipleCourts)
           const coexi = multipleCourts.filter(court =>{
             if( court._id.toString() === req.params.courtid.toString()){
                return court
             }
              
           })
           
          console.log(coexi)
           if(coexi.length === 0){
                return res.send('no courts')
           }
           
           const newcourt = await Court.findByIdAndUpdate(coexi[0]._id,req.body,{new:true})
           res.status(200).json(newcourt)
        
          
    }
    catch(err){
      console.log("error",err)
    }
  };
  export const deleteCourt = async(req,res,next)=>{
      try{
            const deleted =  await Court.findByIdAndDelete(req.params.courtid)
            res.status(200).json({deleted,message:'deleted'})
            console.log()
            await Turf.updateOne(
              { _id: deleted.turf },
              { $pull: { court: deleted._id.toString() } } 
            )
      }
      catch(err){

      }
  };
 