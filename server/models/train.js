import mongoose from 'mongoose'

const trainSchema = new mongoose.Schema({
	name:{
		type:String,
		// required:true
	},
	number:{
		type:String,
		unique:true,
		// required:true
	},
	classes:[{
		classType:String,
		fareRatio:{
			type:Number,
		default:2
		},
		totalSeats:{
			type:Number,
		default:20
		},
		bookedSeats:{
			type:Number,
		default:0
		},
		seats: Array(20).fill(false) 
	}],
	route:[{
		stationName:String,
		stationCode:String,
	arrivalTime:{
		type:String,
		// required:true
	},
	departureTime:{
		type:String,
		// required:true
	},
	distanceUpto:{
		type:Number,
	default:0,
		// required:true
	},
	stoppageTime:{
		type:Number,
	default:Math.random()%10+4
	},
	day:{
		type:Number ,
	default:0
	}
	}],
	runningDays:[{
		index:{
			type:Number ,
		default:7
		}
	}]
})

export default mongoose.model('Train',trainSchema)