import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
	classType:{
		type:String,
		required:true
	},
	fairRatio:{
		type:Number,
		required:true,
	default:1
	},
	totalSeats:{
		type:Number,
		required:true,
	default:50
	},
	bookedSeats:{
		type:Number,
		required:true,
	default:0,
	}
})

export default mongoose.model('Class',classSchema) 