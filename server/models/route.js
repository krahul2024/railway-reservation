import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
	stationName:{
		type:String,
		required:true
	},
	arrivalTime:{
		type:Date,
		required:true
	},
	distanceUpto:{
		type:Number,
		required:true,
	default:0
	},
	departureTime:{
		type:Date,
		required:true
	},
	classes:[{
		name:String,
		fairRatio:Number,
		totalSeats:Number,
		bookedSeats:Number
	}]
})

export default mongoose.model('Route',routeSchema)