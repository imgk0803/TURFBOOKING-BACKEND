import Razorpay from "razorpay"
import Booking from "../models/booking.js";
import crypto from 'crypto'
import { razorpayInstance } from "../razorPayconfig.js";
import Payment from "../models/payment.js";

const key = razorpayInstance.key_secret
export const createOrder = async(req,res,next)=>{
      try{
            const booking = await Booking.findById(req.params.bookid)

            const options ={
                  amount: booking.price*100, 
                  currency: "INR",
                  receipt: "order_rcptid_11"
                };
                const order = await razorpayInstance.orders.create(options)
                const payment = new Payment({
                  booking : req.params.bookid,
                  order : order.id,
                  amount: booking.price,

                })
                await payment.save()
                res.status(200).json(order) 
      }
      catch(err){
            console.log(err)
      }
};

export const verifyPayment = async(req,res,next)=>{
      try{    
              const {pay_id,order_id,signature,} = req.body
              const hmac = crypto.createHmac('sha256',key);
              hmac.update(order_id + '|' + pay_id);
             const generated_signature = hmac.digest('hex');

             if (generated_signature === signature) {
                const payment = await Payment.findOne({order : order_id })
                payment.p_status = 'paid';
                payment.created = new Date();
                await payment.save()

                 
                return res.send('Payment is successful');

      }
      const payment = await Payment.findOne({order : order_id })
      payment.p_status = 'failed';
      await payment.save()
      res.send("payment failed")

}
      catch(err){
            console.log(err)
      }
}
export const getpayment = async(req,res,next)=>{
      try{
              const payment =  await Payment.findById(req.params)
              res.status(200).json(payment)

      }
      catch(err){
            console.log("error:",err)
      }
}
export const getallpayment = async(req,res,next)=>{
      try{
              const payment =  await Payment.find()
              res.status(200).json(payment)

      }
      catch(err){
            console.log("error:",err)
      }
}