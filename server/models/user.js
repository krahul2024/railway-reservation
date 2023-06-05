import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
let date = new Date().toLocaleString("en-In");
// console.log(date)
const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required : true
	},
	address:{
		type:String
	},
	phone:{
		type: String
	},
	email: {
		type:String
	},
	joinedAt:{
		type:String,
	default:date
	},
	username:{
		type:String,
		required:true,
		unique:true
	},
	password: {
		type: String,
		required:true
	},
	profile_image:{
		type:String
	},
	reservations:[],
	wishlist:[],
	token :String ,
	otp:Number ,
	isAdmin:{
		type:Boolean,
	default:false
	}
})

userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id : this._id } , "Thisismysecretkeyforjsonwebtoken") //token generation for this id
		this.tokens = this.tokens.concat({ token : token }) 
		await this.save() 
		// console.log(token)
		return token 
	}
	catch (error) {
		console.log(error) 
	}
}

export default mongoose.model('User',userSchema) 