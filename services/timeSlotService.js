import Court from "../models/court.js";

export const updateTimeSlot = async(req,res)=>{
    const now = new Date();
    const currentHour = now.getHours();
    const courts = await Court.find({
        'timeslot.start' : {$lt:currentHour},
        'timeslot.booked' : false
    });
    for(const court of courts){
        court.timeslot.forEach((slot)=>{
            if(slot.start < currentHour && !slot.booked){
                slot.booked = true;
            }
        })
        await court.save()
    }
   
}
export const resetSlots =async(req,res)=>{
   const courts =  await Court.find();
   for(const court of courts){
    court.timeslot.forEach(slot=>{
        slot.booked = false
    })
    await court.save()
   }
  
}