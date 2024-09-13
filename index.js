import express from 'express'
import cors from 'cors'
import dbConnect from './db.js'
import v1Router from './v1router.js'
import cron from 'node-cron'
import cookieParser from 'cookie-parser'
import { resetSlots, updateTimeSlot } from './services/timeSlotService.js'

const app = express()
const port = 3000
dbConnect();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api', v1Router)
cron.schedule('0 * * * *', async () => {
  try{
    await updateTimeSlot();
  }
  catch(err){
    console.log("error",err)
  }

});
cron.schedule('0 0 * * *', async () => {
  try{
    await resetSlots();
  }
  catch(err){
     console.log("err",err)
  }
 
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})