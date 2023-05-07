import mongoose from 'mongoose'

const stationSchema = new mongoose.Schema({
	name:{
		type:String
	},
	code:{
		type:String
	},
	address:{
		type:String
	}

})



export default mongoose.model('Station',stationSchema) 