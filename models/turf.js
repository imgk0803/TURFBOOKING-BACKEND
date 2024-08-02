import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
    bookings: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    manager: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    court : [{type:mongoose.Schema.Types.ObjectId,ref:'Court'}],
    title :{
        type : String,
        required : true
    },
   description :{
   type : String
   },
    city :{
        type : String,
        required :true

    },
    dist :{
        type : String,
        required:true
    },
        
    lat:{
             type :Number,
             
        },
    long: {  
             type:Number,
            
        },
    image :{
        type:String,
        require:true
    }

})

const Turf = mongoose.model('Turf', turfSchema)
export default Turf;