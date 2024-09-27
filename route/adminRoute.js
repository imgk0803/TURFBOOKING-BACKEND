import express from 'express'
import upload from '../middleware/cloudinaryUpload.js'
import { createTurf, deleteTurf, getallTurf, getTurf, updateTurf } from '../controller/turfController.js'
import { addcourt, deleteCourt, getCourts,updateCourt } from '../controller/courtController.js'
import { createManager } from '../controller/userController.js'
import { resetSlots, updateTimeSlot } from '../services/timeSlotService.js'
const adminRouter = express.Router()

adminRouter.post('/turf',upload.single("image"),createTurf )//ok
adminRouter.get('/turf',getallTurf)//ok
adminRouter.get('/turf/:turfid',getTurf)//ok
adminRouter.patch('/updateturf/:turfid',upload.single("image"),updateTurf)//ok
adminRouter.delete('/turf/:turfid',deleteTurf)
adminRouter.post('/addcourt/:turfid',addcourt)//ok
adminRouter.post('/updatecourt',updateCourt)//ok
adminRouter.delete('/turf/deletecourt/:courtid',deleteCourt)
adminRouter.post('/addmanager',createManager)//ok
adminRouter.post('/update-timeslots',async(req,res)=>{
    try {
        await updateTimeSlot();
        res.status(200).send({message:`Timeslot Updated`})
    } catch (err) {
        res.status(500).send({ message: 'Error updating timeslots', err });
    }
})
adminRouter.post('/reset-slots',async(req,res)=>{
   try{
      await resetSlots();
      res.status(200).send({message:'timeslot reseted successfully'})
   } 
   catch(err){
    res.status(500).send({ message: 'Error resetting timeslots', err });
   }
})//ok
export default adminRouter