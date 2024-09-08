import express from 'express'
import upload from '../middleware/cloudinaryUpload.js'
import { createTurf, deleteTurf, getallTurf, getTurf, updateTurf } from '../controller/turfController.js'
import { addcourt, deleteCourt, getCourts,updateCourt } from '../controller/courtController.js'
import { createManager } from '../controller/userController.js'
const adminRouter = express.Router()

adminRouter.post('/turf',upload.single("image"),createTurf )
adminRouter.get('/turf',getallTurf)
adminRouter.get('/turf/:turfid',getTurf)
adminRouter.patch('/turf/:turfid',updateTurf)
adminRouter.delete('/turf/:turfid',deleteTurf)
adminRouter.post('/turf/:turfid',addcourt)
adminRouter.post('/turf/updatecourt/:turfid/:courtid',updateCourt)
adminRouter.delete('/turf/deletecourt/:courtid',deleteCourt)
adminRouter.post('/addmanager',createManager)
export default adminRouter