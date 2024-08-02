import express from "express";
import userRouter from "./route/userRoute.js";
import adminRouter from "./route/adminRoute.js";
import managerRouter from "./route/managerRoute.js";
import { authAdmin } from "./middleware/authAdmin.js";
const v1Router = express.Router()
v1Router.use('/admin',authAdmin,adminRouter)
v1Router.use('/user',userRouter)
v1Router.use('/manager',managerRouter)
export default v1Router