import express from 'express'
import mongoose from 'mongoose'
import User from './models/user.js'
import trainRouter from './routes/train.js'
import userRouter from './routes/user.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config.js'
import path from 'path'

const file_path = path.resolve()

const app = express() , PORT = 4000
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({extended:true})); 
app.set('trust proxy',1);
app.use(express.json()); 
app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk
app.use(express.static('public')); 
app.use('/uploads',express.static(file_path + '/uploads')); 

//connecting to the database
config.mongo_connect()

app.get("/",(req,res) => {
	res.send("hello bro")
})

app.use('/train' , trainRouter)
app.use('/user' , userRouter) 


app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`))