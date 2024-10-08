import Court from "../models/court.js";

export const updateTimeSlot = async()=>{
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const currentHour = new Date(now).getHours();
    const courts = await Court.find({
        'timeslot.start' : {$lt:currentHour},
        'timeslot.booked' : false
    }).populate('timeslot');

    for(const court of courts){
        court.timeslot.forEach((slot)=>{
            if(slot.start < currentHour && !slot.booked){
                slot.booked = true;
            }
        })
        await court.save()
    }   
}
export const resetSlots =async()=>{
   const courts =  await Court.find();
   for(const court of courts){
    court.timeslot.forEach(slot=>{
        slot.booked = false
    })
    await court.save()
   }
}
