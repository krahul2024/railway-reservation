import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import User from './models/user.js'
import trainRouter from './routes/train.js'
import userRouter from './routes/user.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express() , PORT = 4000
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))

env.config() //for using .env file and its contents 
app.use(express.urlencoded({extended:true})) //for using json format and sending messages and data in json format
app.use(express.json())  // for using json format and other stuff related to idk


//connecting to the database
const connection_uri = "mongodb+srv://sandipkumar2024:q79XDvGOuM7j7rjf@cluster0.rzeza5v.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(connection_uri , {
// 	useNewUrlParser:true , useUnifiedTopology:true
// }).then(() => console.log('Connected to the database successfully'))
// 	.catch(error => console.log('There was an error connecting to the database. Please try again later.'))
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://0.0.0.0:27017/railDB',{ useNewUrlParser : true })
	.then(() => console.log(`Connected to the database successfully!`))
	.catch((error) => {
		console.log(`There was an error connecting to the database. ${error}`) // printing the error
	})

app.get("/",(req,res) => {
	res.send("hello bro")
})

app.use('/train' , trainRouter)
app.use('/user' , userRouter) 


app.listen(PORT, () => console.log(`Server is running on the PORT: ${PORT}`))