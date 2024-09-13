import mongoose from "mongoose";
import Court from "../models/court.js";
import Turf from "../models/turf.js";
import User from "../models/user.js";

export const addcourt =  async(req,res,next)=>{
    try{
          const{turfid} = req.params
          const newtimeslot = 
          [
            { "start": 6, "end": 7, "booked": false },
            { "start": 7, "end": 8, "booked": false },
            { "start": 8, "end": 9, "booked": false },
            { "start": 9, "end": 10, "booked": false },
            { "start": 10, "end": 11, "booked": false },
            { "start": 11, "end": 12, "booked": false },
            { "start": 12, "end": 13, "booked": false },
            { "start": 13, "end": 14, "booked": false },
            { "start": 14, "end": 15, "booked": false },
            { "start": 15, "end": 16, "booked": false },
            { "start": 16, "end": 17, "booked": false },
            { "start": 17, "end": 18, "booked": false },
            { "start": 18, "end": 19, "booked": false },
            { "start": 19, "end": 20, "booked": false },
            { "start": 20, "end": 21, "booked": false },
            { "start": 21, "end": 22, "booked": false },
            { "start": 22, "end": 23, "booked": false },
            { "start": 23, "end": 24, "booked": false }
          ]
          
          
          
          const court = new Court({
            ...req.body,
            timeslot : newtimeslot,
            turf : turfid
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
          
          const {courtid , price}  =  req.body
           const newcourt = await Court.findByIdAndUpdate(courtid,{price : price},{new:true})
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
            await Turf.updateOne(
              { _id: deleted.turf },
              { $pull: { court: deleted._id.toString() } } 
            )
      }
      catch(err){

      }
  };
  export const getOneCourt = async(re,res,next)=>{
     try{
               const {courtid} = req.params
     }
     catch(err){
      console.log(err)
     }

  }
 