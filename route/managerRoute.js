import express from 'express'
import { deleteBooking, getallbookig, getoneBooking, updateBooking } from '../controller/bookingController.js'
import { managerturf } from '../controller/turfController.js'
const managerRouter =express.Router()
managerRouter.get('/getbooking/:bid',getoneBooking)
managerRouter.get('/booking',getallbookig)
managerRouter.patch('/court/:courtid/booking/:bid',updateBooking)
managerRouter.delete('/deletebooking/:bid',deleteBooking)
managerRouter.get('/getturfby/:managerid',managerturf)


export default managerRouter