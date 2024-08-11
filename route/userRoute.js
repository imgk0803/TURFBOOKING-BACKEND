import express from "express";
import {deleteUser, getallUser, login, signin, updatePassword, updateProfile} from '../controller/userController.js'
import { createBooking, deleteBooking, getallbookig, getoneBooking } from "../controller/bookingController.js";
import { createOrder, getallpayment, verifyPayment } from "../controller/paymentController.js";
import { mock } from "../utils/mocksignature.js";
import { getallTurf, getTurf } from "../controller/turfController.js";
import { createReview, deleteReview, getReview, updateReview } from "../controller/reviewController.js";
const userRouter = express.Router()
userRouter.post('/signin',signin)
userRouter.post('/login',login)
userRouter.post('/:userid/court/:courtid',createBooking)
userRouter.delete('/deletebooking/:bid',deleteBooking)
userRouter.post('/createorder/:bookid',createOrder)
userRouter.post('/verifypayment',verifyPayment)
userRouter.get('/mock',mock)
userRouter.get('/bookings',getallbookig)
userRouter.get('/bookingone/:bid',getoneBooking)
userRouter.get('/payments',getallpayment)
userRouter.post('/:userid/turf/:turfid/addreview',createReview)
userRouter.get('/getreview',getReview)
userRouter.patch('/editreview/:id',updateReview)
userRouter.delete('/deletereview/:id',deleteReview)
userRouter.get('/turf',getallTurf)
userRouter.get('/getoneturf/:turfid',getTurf)
userRouter.patch('/updatepwd/:userid',updatePassword)
userRouter.patch('/updateprofile/:userid',updateProfile)
userRouter.delete('/deleteuser/:userid',deleteUser)
userRouter.get('/getusers',getallUser)

export default userRouter