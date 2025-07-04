import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv"
dotenv.config()



const app = express();

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(token,
                process.env.JWT_SECRET,
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }
                    

                }
            )
        
        }else{
        next()
        }
    }
)





const connectionString = process.env.MONGO_URI
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the databse")
    }
)


app.use("/users",userRouter)
app.use("/products",productRouter)




app.delete("/" ,()=>{
    console.log("This is delete request")
})

app.listen(5000 ,
    ()=>{
        console.log("Server started")
    }
)
