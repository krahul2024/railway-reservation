import mongoose from 'mongoose'
const pnrSchema = new mongoose.Schema({
	pnr:Number 
})

export default mongoose.model('Pnr' ,pnrSchema)