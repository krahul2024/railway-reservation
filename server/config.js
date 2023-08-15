import mongoose from 'mongoose' 
import dotenv from 'dotenv'
dotenv.config()

const mongo_connect = () => {
	mongoose.set('strictQuery', false);
	mongoose.set('strictPopulate', false);
	const connection_uri = `mongodb+srv://${process.mongo_username}:${process.mongo_username}@cluster0.rzeza5v.mongodb.net/?retryWrites=true&w=majority`
	// mongoose.connect(connection_uri , {
	// 	useNewUrlParser:true , useUnifiedTopology:true
	// }).then(() => console.log('Connected to the database successfully'))
	// 	.catch(error => console.log('There was an error connecting to the database. Please try again later.'))
	mongoose.connect('mongodb://0.0.0.0:27017/railDB',{ useNewUrlParser : true })
		.then(() => console.log(`Connected to the database successfully!`))
		.catch((error) => {
			console.log(`There was an error connecting to the database. ${error}`) // printing the error
		})
}


const config = {
	mongo_connect,
	aws_access_key:process.aws_access_key,
	aws_secret_access_key:process.aws_secret_access_key,
	PORT:process.env.PORT,
}

export default config