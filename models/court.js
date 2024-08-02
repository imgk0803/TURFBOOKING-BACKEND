import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
    turf : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Turf',
        required :true
    },
    booking : [{
          type: mongoose.Schema.Types.ObjectId,
          ref : 'Booking',
          require :true
    }],
  sport : {
         type : String,
         enum :['football','cricket','badminton','volleyball'],
         required : true
        
  },
  description : {
        type : String,
        required : true
  },
  size:{
    type : String,
    required : true
  },
price : {
    type :Number,
    required : true
},
timeslot: [{
    start: {
      type: String,  
      required: true
    },
    end: {
      type: String, 
      required: true
    },
    booked: {
      type: Boolean,
      default: false 
    }
  }],
 



})
const Court = mongoose.model('Court',courtSchema)
export default Court; 