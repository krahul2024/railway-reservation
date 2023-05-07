import express from 'express'
import mongoose from 'mongoose'
import Station from '../models/station.js'
import Class from '../models/class.js'
import Train from '../models/train.js'
const router = express.Router() 
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
router.use(cookieParser())  


//------------------------ALL GET ROUTES----------------------------------------------------
router.get("/", (req,res) => {
	res.send("this is train page")
})

const weekdays = [{
	index:0, name:"Sunday",short:"Sun"
},{
	index:1,name:"Monday",short:"Mon"
},{
	index:2,name:"Tuesday",short:"Tue"
},{
	index:3,name:"Wednesday",short:"Wed"
},{
	index:4,name:"Thursday",short:"Thu"
},{
	index:5,name:"Friday",short:"Fri"
},{
	index:6,name:"Saturday",short:"Sat"
},{
	index:7,name:"All Days",short:"All"
}]

// console.log(weekdays)

//--------------------for getting list of all the stations-----------------------------------
router.get("/station_list" , async (req, res) => {
	// console.log('hello')
	try{

		const stations = await Station.find({})
		if(!stations) return res.status(400).send({
			success:false ,
			msg:"There was an error getting list of stations! Please try again later."
		})
		return res.status(200).send({
			success:true,
			msg:"successfully fetched list of stations.",
			stations
		})
	}
	catch (error) {
		// console.log(error) 
		return res.status(400).send({
			success:false,
			msg:"There was an error getting list of stations! Please try again later."
		})
	}
	
})

//------------------------for getting list of all the classses-----------------------------------
router.get("/class_list" , async  (req , res) => {
	try{

		const classes = await Class.find({}) 

		if(!classes) return res.status(400).send({
			success:false ,
			msg:"There was an error getting list of all the classes! Please try again later."
		})

		return res.status(200).send({
			success:true,
			msg:"Successfull fetched list of all the classes.",
			classes
		})
	}
	catch(error) {
		// console.log(error) 
		return res.status(400).send({
			success:false ,
			msg:"There was an error getting list of all the classes! Please try again later."
		})
	}
})


router.get("/train_list" , async (req,res) => {
	try{
		// console.log("hello")
		const trains = await Train.find({}) 
		if(!trains) return res.status(400).send({
			success:false,
			msg:"There was problem fetching list of trains. Please try again later."
		})
		// // console.log(trains)
		return res.status(200).send({
			success:true,
			msg:"Successfully fetched list of all the trains.",
			trains
		})
	}
	catch(error) {
		// console.log(error) 
		return res.status(400).send({
			success:false,
			msg:"There was an error! Please try again later."
		})
	}
})




//----------------------------------ALL POST ROUTES-----------------------------------

//-------------------------For adding stations -----------------------------
router.post("/add_station", async (req,res) => {
	// console.log(req.body)
	
	try{
		const { name , code , address } = req.body 
		let station = await Station.findOne({code})
		if(station ) return res.status(400).send({
			success:false,
			msg:"This code is given to another station.\n You can update station details with this code.",
			toPath:"/update_station"
		})
		let new_station = new Station({
			name , code ,address
		})

		new_station = await new_station.save() 
		if(!new_station) throw err 
		return res.status(200).send({
			success:true,
			msg:"Station added successfully!",
			toPath:"/station_list",
			station:new_station
		})
	}
	catch(err) {
		// // console.log(err) 
		return res.status(400).send({
			success:false,
			msg:"There was an error!\nPlease try again later..."
		})
	}
})

router.get("/exp" , async(req,res) => {
	let class_item = new Class({
		classType:'Sleeper',
		fareRatio:0.75
	})
	console.log(await class_item.save())
})


//----------------------For adding classes----------------------------------
router.post("/add_class",async (req,res) => {
	// console.log(req.body) 

	try{
		const { classType , fairRatio , totalSeats } = req.body 

		let result = await Class.findOne({classType})
		// console.log(result)
		if(result) return res.send({
			success:false,
			msg:"This class already exists!  Please try with another name",
			topath:"/add_class"
		})
		result = new Class({
			classType , fareRatio , totalSeats 
		})
		result = await result.save() 
		// console.log(result)
		if(!result) throw err 
		return res.status(200).send({
			success:true,
			msg:"Class added successfully!",
			toPath:"/class_list",
			class:result
		})
	}
	catch (err) {
		// console.log(err)
		return res.status(400).send({
			success:false,
			msg:"There was an error! Please try again later..."
		})
	}
})

//-----------------------For adding trains--------------------------------------
router.post("/add_train",async (req, res) => {
	// console.log(req.body) 

	const { name , number, classes , route } = req.body 
	console.log(req.body) 
	// in this we have to add running days for a train which is in the form of an array containing integers in the range 0-7, 7 is for all days
	// try{
	// 	//calculation of departure time by adding stoppage time to arrival time at a particular station
	// 	let train = await Train.findOne({number}) 
	// 	if(train) return res.status(400).send({ //in case if we have already a train with this number
	// 		success:false,
	// 		msg:`Train number already exists! Please try again with another train number.`,
	// 		toPath:"/add_train",
	// 		train
	// 	})

	// 	for(let i=0;i<route.length;i++){
	// 			let hour = parseInt(route[i].arrivalTime.split(':')[0]), minute = parseInt(route[i].arrivalTime.split(':')[1])
	// 			hour = hour*60 + minute + parseInt(route[i].stoppageTime) 
	// 			minute = hour%60 , hour = Math.floor(hour/60) , hour = hour%24
	// 			route[i].departureTime = (hour<10?"0"+hour:hour) + ":" + (minute<10?"0"+minute:minute) 
	// 		}
	// 	for(let i=0;i<classes.length;i++)classes[i].bookedSeats = 0 	

	// 	train = new Train({ name , classes , route , number })

	// 	train = await train.save() 
	// 	// console.log(train)

	// 	if(!train) throw error 

	// 	return res.status(200).send({
	// 		success:true,
	// 		msg:"Train added successfully!",
	// 		toPath:"/train_list",
	// 		train
	// 	})
	// }
	// catch(error) {
	// 	// console.log("There was an error! Please try again later.")
	// 	// console.log(error)
	// 	return res.status(400).send({
	// 		success:false,
	// 		msg:"There was an error adding the train! Please try again later."
	// 	})
	// }

})


router.post("/search_trains", async (req,res) => {
	// console.log(req.body) 
	let {train , date } = req.body , 
		name = train.name?train.name:'',
		 number = train.number?train.number:'',
		start = train.start?train.start:'',
		end = train.end?train.end:'',
		endCode , startCode ,trains = []

	//first case if the train number of name is given
	if(name){
		 trains = await Train.find({name})
		 if(!trains) return res.status(200).send({ //in case we don't find any train with this name
		 	success:false ,
		 	msg:"No such train with this name! Please try again later."
		 })
		 if(trains.length>0) start = trains[0].route[0].stationName 
		 if(trains.length>0) end = trains[0].route[trains[0].route.length-1].stationName 
	}

	//if we are only provided with train name
	else if(number){
		 trains = await Train.find({number})
		 if(!trains) return res.status(200).send({ // in case if we don't find any train with provided train number
		 	success:false ,
		 	msg:"There is no train with this number! Please try again later."
		 })
		 if(trains.length>0) start = trains[0].route[0].stationName 
		 if(trains.length>0) end = trains[0].route[trains[0].route.length-1].stationName
	}
	// if only baording station name if provided
	else if(start){
		let trains_list = await Train.find({})
		if(!trains_list) return res.status(400).send({ // in case of any error
			success:false,
			msg:"There was an error fetching list of trains! Please try again later."
		})
		trains = trains_list.filter((trainItem) => {
			let yes = false 
			trainItem.route.map((item , index) => {
				if(item.stationName === start && index < trainItem.route.length-1) yes = true 
			})	
			return yes	
		}) 
		if(end){
			//so far we have all the trains which have boarding station in their route
			//now we have to filter this list by checking if index of destination station 
			//is greater than index of boarding station
			let resultant_train_list = trains.filter((train_item , train_index) => {
				// // console.log(train_item.name) 
				//now we have to check for the two stations present in the route of every train and end station should 
				//come after start station always
				let start_index = -1 , end_index = -1 
				for(let i=0; i<train_item.route.length ;i++){
					if(start === train_item.route[i].stationName) start_index = i 
					else if(end === train_item.route[i].stationName) end_index = i
				}


				return start_index <= end_index 
			})
			trains = resultant_train_list 
		}
	}
	// if only destination station is provided
	else if(end) {
		let trains_list = await Train.find({})
		if(!trains_list) return res.status(400).send({ // in case of any error
			success:false ,
			msg:"There was an error fetching list of trains! Please try again later.",
		})
		trains = trains_list.filter((train_item) => {
			let yes = false 
			train_item.route.map((route_item , index) => {
				if(end == route_item.stationName && index > 0) yes = true 
			})
			return yes
		})
		// console.log(trains)
	}
	start = await Station.findOne({name:start})
	end = await Station.findOne({name:end})
	// console.log(start ,end) 

	return res.status(200).send({
		station:{start ,end } ,
		trains,
		success:true ,
		msg:"Successfully fetched trains data.",
		size:trains.length,
		date:req.body.date
	})


})

router.post("/update_train", async (req,res) => {
	// console.log(req.body) 
	const {number} = req.body
	console.log(number) 
	let trains = await Train.find({})

	// if(!train) return res.status(400).send({
	// 	success:false,
	// 	msg:"No such train exists"
	// })
	trains.map((train) => {
		const route = train.route 
		//what we will be doing here is store the amount of increment by which we have to add to 
		// previous index of any running day and that will do the thing as we will be needing to store 
		// multiple values of days indexes which is just waste of space and time 
		//just store incremental value 
		route[0].day = 0 //this is the amount by which we will increment the days index 
		for(let i=1;i<route.length;i++){
			let prev_day = route[i-1].day , curr_day = route[i].day
			let  prev_time = parseInt(route[i-1].arrivalTime.split(':')[0]), curr_time = parseInt(route[i].arrivalTime.split(':')[0])
			// console.log(prev_time , curr_time)
			if(curr_time < prev_time) curr_day = (prev_day + 1)%8 , route[i].day = curr_day 
			else curr_day = prev_day , route[i].day = curr_day
		}
		// route.map((item) => {
		// 	console.log(item.day) 
		// })
		train.runningDays.sort() 
		train = train.save() 
		// console.log(train) 
		route.map((item) => console.log(item.day))
	})
	
})


router.post("/storeResInfo" , (req, res) => {
	console.log(req.body) 
	// res.cookie('accessToken' , token , {
	// 			withCredentials:true , 
	// 			httpOnly:true , 
	// 			maxAge:age*10 ,
	// 			secure:false 
	// 		})

	res.cookie('reservationCookie' , resToken , {
		withCredentials:true ,
		httpOnly:true ,
		maxAge:500000000,
		secure:false 
	})
	return res.status(200).send({
		success:true ,
		msg:"Reservation details saved successfully. You can login now."
	})
})

router.get("/refresh_trains" ,async(req,res) => {
	const trains = await Train.find({}) 
	for(let i=0;i<trains.length;i++) {
		const { classes } = trains[i]
		for(let j=0;j<classes.length;j++) classes[j].seats = Array(classes[j].totalSeats).fill(false) 
		let result = await trains[i].save() 
	}
	console.log("Trains Refreshed.....")
	res.send("Trains Refreshed.....")
})



export default router