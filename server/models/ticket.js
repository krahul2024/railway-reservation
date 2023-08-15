import mongoose from 'mongoose'

const date = new Date();
 const booking_date = date.toLocaleString("en-IN")

const ticketSchema = new mongoose.Schema({
	createdAt:{
		type:String,
		required:true,
	default: booking_date
	},
	pnr:String ,
	user:{
		name:String ,
		address:String,
		age:String,
		phone:String,
		email:String
	},
	bookedBy:String,
	train:{
		name:String,
		number:String ,
		id:String 
	},
	date:{},
	jClass:{},
	distance:Number,
	stations:{},
	seat:Number, 
	status:String

})

export default mongoose.model('Ticket', ticketSchema)