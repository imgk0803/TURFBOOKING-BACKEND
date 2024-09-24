import Booking from "../models/booking.js"
import Court from "../models/court.js"
import User from "../models/user.js"
import Turf from "../models/turf.js";


export const createBooking = async(req,res,next)=>{
    try{
            const{userid} =req.params
            const{courtid} = req.params
            const {start} =req.body.timeslot
            const {end}  = req.body.timeslot
            const bookdate = new Date(req.body.date)
            const court = await Court.findById(courtid)
            const bookingsExist = await Booking.findOne({court : courtid , 
                'timeslot.start':start ,
                 'timeslot.end':end ,
                  date : bookdate}) 
            if(bookingsExist){
                return res.send('Already Booked')
            }
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
            res.status(200).json(booking)
    }
    catch(err){
        console.log("error::",err)
    }
};
export const deleteBooking= async(req,res)=>{
try{
    const deleted = await Booking.findByIdAndDelete(req.params.bid)
    await Court.findOneAndUpdate({_id:deleted.court,
        'timeslot.start':deleted.timeslot.start,
        'timeslot.end':deleted.timeslot.end},{
        $set:{'timeslot.$.booked':false}},{new:true}
        )
    res.status(200).json(deleted)

}
catch(err){
    console.log(err)
}
}
export const cancelBooking = async(req,res,next)=>{
    try{    

            const deleted = await Booking.findByIdAndUpdate(req.params.bid,{status : "canceled"},{new : true})
            if(!deleted){
                return res.status(500).send("there is no such booking")
            }
            await Court.findOneAndUpdate({_id:deleted.court,
                'timeslot.start':deleted.timeslot.start,
                'timeslot.end':deleted.timeslot.end},{
                $set:{'timeslot.$.booked':false}},{new:true}
                )
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
export const getManagerBooking = async(req,res,next)=>{
    try{
                const managerid = req.params.managerid
                const turf = await Turf.findOne({manager:managerid})
                const courtids = turf.court && turf.court.map(court=>court._id.toString())
                const bookings = await Booking.find({court :{
                    $in : courtids
                }
                }).populate('court').populate('user')
                res.status(200).json(bookings)
                

                
    }
    catch(err){
        console.log(err)
    }
};
export const updateBooking = async(req,res,next)=>{      
    try{     
            const{courtid} = req.params
           const {start , end } =req.body
            const court = await Court.findById(courtid)
            const availabletime = court.timeslot.filter(ts=>{
                if(ts.booked === false){
                    return ts
                }
            })
            if(availabletime.length===0){
                return res.send('no slots available')
            }
            const timeslotmatch =  availabletime.filter(ts=>{
             
                if(ts.start === start && ts.end === end){
                    return ts
                }
            })
            if(timeslotmatch.length === 0){
                return res.send("this time slot isnt available")
            }
            const booking = await Booking.findById(req.params.bid)
            if(booking.status !== 'confirmed'){
                return res.send('The Booking Is Already Cancelled')
            }
            const updated = await Booking.findByIdAndUpdate(req.params.bid,{
                    "timeslot.start" : start,
                    "timeslot.end" : end
                    }
            ,{new:true})
            if(updated){
                const settrue = await Court.findOneAndUpdate({_id:courtid,'timeslot.start':start,'timeslot.end':end},
                    {$set:{'timeslot.$.booked':true}},{new:true})   
                const setfalse = await Court.findOneAndUpdate({_id:courtid,'timeslot.start':booking.timeslot.start,'timeslot.end':booking.timeslot.end},
                    {$set:{'timeslot.$.booked':false}},{new:true})
                    return res.status(200).json({settrue , setfalse})
            }
            res.status(200).send("Didnt Updated")

    }
    catch(err){
        console.log(err)
    }
}