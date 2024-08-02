import Review from "../models/review.js";
import User from "../models/user.js";


export const createReview = async(req,res,next)=>{
    try{
                const{turfid,userid} = req.params
                console.log(req.params)
                const review = new Review({
                    ...req.body,
                    turf : turfid,
                    reviewer : userid,
                })
                await review.save()
                res.status(200).json(review)
    }
    catch(err){
        console.log(err)
    }
};

export const getReview = async(req,res,next)=>{
    try{

        const review = await Review.find()      
        if(!review){
           
               return res.status(500).send("there is no review")
           

        }
        res.status(200).json(review)

        

    }
    catch(err){
        console.log(err)
    }
};

export const updateReview = async(req,res,next)=>{
    try{
              const updated = await Review.findByIdAndUpdate(req.params.id,req.body,{new:true})
              res.status(200).json(updated)
    }
    catch(err){
        console.log(err)
    }
};
export const deleteReview = async(req,res,next)=>{
    try{
             const deleted = await Review.findByIdAndDelete(req.params.id)
             res.status(200).json(deleted)

    }
    catch(err){
        console.log(err)
    }
}