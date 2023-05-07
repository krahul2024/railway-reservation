import mongoose from 'mongoose'

 const date = new Date();
 const booking_id = 'RESID' + date.getTime()
 const booking_date = date.toLocaleString("en-IN")

 console.log(typeof(booking_id))
 console.log(booking_id,booking_date)

const reservationSchema = new mongoose.Schema({
	createdAt:{
		type:String,
		required:true,
	default: booking_date
	},
	id:{
		type:Number,
		// required:true,
		default:booking_id
	},
	train:{
		name:String,
		code:String,
		// required:true
	},
	class:{},
	boardingStation:{
		name:String,
		arrivalTime:String,
		departureTime:String,
		// required:true
	},
	destinationStation:{
		name:String,
		arrivalTime:String,
		departureTime:String,
		// required:true
	},
	amount:{
		type:Number,
		// required:true
	},
	quantity:{
		type:Number,
		// required:true,
	default:1
	},
	bookedBy:{
		type:String,
		// required:true
	}, //get this information by username of the account which the ticket is booked from	
	users:[{
		name:String,
		age:Number,
		phone:String,
		email:String,
		address:String
	}]
})

export default mongoose.model('Reservation',reservationSchema) 