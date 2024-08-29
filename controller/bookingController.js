import Booking from "../models/booking.js"
import Court from "../models/court.js"
import User from "../models/user.js"


export const createBooking = async(req,res,next)=>{
    try{
            const{userid} =req.params
            const{courtid} = req.params
           const {start} =req.body.timeslot
           const {end}  = req.body.timeslot

            const court = await Court.findById(courtid)
            const availabletime = court.timeslot.filter(ts=>{
                if(ts.booked === false){
                    return ts
                }
            })
            
            if(availabletime.length===0){
                return res.send('no slots available')
            }
           
            const timeslotmatch =  availabletime.filter(ts=>(ts.start === start && ts.end === end))
            if(timeslotmatch.length === 0){
                return res.send("this time slot isnt available")
            }
            
            const booking = new Booking({
                ...req.body,
                user : userid,
                court : courtid,
                price : court.price            })
            await booking.save()
           const updatedcourt = await Court.findOneAndUpdate({_id:courtid,'timeslot.start':start,'timeslot.end':end},
                {$set:{'timeslot.$.booked':true}},{new:true})//update the availabilty of courts
            await User.findByIdAndUpdate(userid,{$push:{bookings:booking._id}},{new:true})
            await Court.findByIdAndUpdate(courtid,{$push:{booking : booking._id}},{new:true})
            res.status(200).json(booking)
    }
    catch(err){
        console.log("error::",err)
    }
};
export const deleteBooking = async(req,res,next)=>{
    try{     
            const deleted = await Booking.findByIdAndDelete(req.params.bid)
            if(!deleted){
                return res.status(500).send("there is no such booking")
            }
            await User.updateOne({_id:deleted.user},{$pull:{bookings:deleted._id.toString()}})
            await Court.findOneAndUpdate({_id:deleted.court,
                'timeslot.start':deleted.timeslot.start,
                'timeslot.end':deleted.timeslot.end},{
                $set:{'timeslot.$.booked':false}},{new:true}
                )
            await Court.updateOne({_id:deleted.court},{$pull:{booking:deleted._id.toString()}})
            res.status(200).json(deleted)
    }
    catch(err){
         console.log(err)
    }
};
export const getallbookig = async(req,res,next)=>{
    try{
             const bookings = await Booking.find().populate({path:'court',populate:{path : 'turf'}}).exec()
             if(!bookings){
                
                    return res.status(500).send("there is no booking")
                

             }
             res.status(200).json(bookings)

    }
    catch(err){
        console.log(err)
    }
};
export const getoneBooking = async(req,res,next)=>{
    try{
                const booking = await Booking.findById(req.params.bid)
                if(!booking){
                    return res.status(500).send("there is no such booking")
                }
                res.status(200).json(booking)
    }
    catch(err){
        console.log(err)
    }
};
export const updateBooking = async(req,res,next)=>{      
    try{     
            const{courtid} = req.params
           const {start} =req.body.timeslot
           const {end}  = req.body.timeslot
            const court = await Court.findById(courtid)
            const availabletime = court.timeslot.filter(ts=>{
                if(ts.booked === false){
                    return ts
                }
            })
            console.log(availabletime)
            if(availabletime.length===0){
                return res.send('no slots available')
            }
            console.log(availabletime)
            const timeslotmatch =  availabletime.filter(ts=>{
             
                if(ts.start === start && ts.end === end){
                    return ts
                }
            })
            console.log("slotmatch   ",timeslotmatch)
            if(timeslotmatch.length === 0){
                return res.send("this time slot isnt available")
            }
   
            const updated = await Booking.findByIdAndUpdate(req.params.bid,req.body,{new:true})
            res.status(200).json(updated)

    }
    catch(err){
        console.log(err)
    }
}