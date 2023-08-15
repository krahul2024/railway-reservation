import React, { useState , useContext }  from 'react' 
import { useLocation  , useNavigate , NavLink} from 'react-router-dom'
import DatePicker from "react-multi-date-picker"
import './styles.css'
import {UserContext} from '../userContext.js'
import baseUrl from './baseUrl.js'


const ReservationDetails = () => {
	const location = useLocation() 
	const navigate = useNavigate()
	const {profile , setProfile } = useContext(UserContext)
	const weekdays = [
	  { index: 0, name: 'Sunday', short: 'Sun' },
	  { index: 1, name: 'Monday', short: 'Mon' },
	  { index: 2, name: 'Tuesday', short: 'Tue' },
	  { index: 3, name: 'Wednesday', short: 'Wed' },
	  { index: 4, name: 'Thursday', short: 'Thu' },
	  { index: 5, name: 'Friday', short: 'Fri'
	  },
	  { index: 6, name: 'Saturday', short: 'Sat' },
	  { index: 7, name: 'All Days', short: 'All' }
	]
	let [quantity , setQuantity] = useState(0)
	let[exclude , setExclude] = useState(false)
	let [userInfo , setUserInfo] = useState([{
		name:"name of person"  , email:profile?.email, phone:profile?.phone, age:22, address:profile?.address
	}])
	let [date , setDate] = useState(new Date())
	console.log(date)

	const  train = location.state.train
	const stations = {
		boarding:location.state.startRoute,
		destination:location.state.endRoute
	}
	const selectedClass = location.state.class 
	const distance = stations.destination.distanceUpto - stations.boarding.distanceUpto
	// console.log(distance)

	const addAnotherUser = (e) => {
		e.preventDefault() 
		const value = [...userInfo] 
		value.push({
			name:"name of person" , 
			email:profile?.email , 
			phone:profile?.phone, 
			age:22, 
			address:profile?.address
		})
		setUserInfo(value) 
	}
	let dateString = new Date() + ' '
	let dateValues  = dateString.split(' ')
	console.log(dateValues) 
	const removeSpecificUser = (e, index) => {
		e.preventDefault() 
		const value = [...userInfo] 
		value.splice(index,1)  
		setUserInfo(value) 
	}

	const handleUserInputs = (e, index) => {
		// console.log(e.target.name ,e.target.value , index)
		let values = [...userInfo]
		values[index][e.target.name] = e.target.value 
		setUserInfo(values)
	}
	const addition_value = stations.boarding.day
	console.log({addition_value})

	const processReservationInformation = (e) => {
		e.preventDefault() 
		if(date.day) {
		const resInfo = {
			train, 
			class:selectedClass , 
			users:userInfo ,
			 distance , 
			 quantity , 
			 stations ,
			 date:{
			 	day:{
			 		value:date.day ,
			 		name:date.weekDay.name ,
			 		index:date.weekDay.index
			 	},
			 	month:{
			 		name:date.month.name,
			 		index:date.month.index
			 	},
			 	year:date.year 
			 }
		}
		
			navigate("/confirmation",{
				state:{
					resInfo
				}
			}) 
		}
		else {
			window.alert("No Date Selected, Please select a valid journey date. Thanks.")
			// window.location.reload() 
		}
	}

	let date_now = new Date() , daysToHide = []
	date_now = date_now.getDate()  //this date is for masking all the dates in calendar till today's date as we aren't allowed to book tickets for days before today
	for(let i=0;i<date_now;i++) daysToHide.push(i) 
	let datesToHide = [] , rundays = train.runningDays 
	for(let i=0;i<rundays.length;i++)datesToHide.push((rundays[i].index+addition_value)%7) 
	datesToHide.sort((a,b) => a>b?1:-1) 
	console.log(datesToHide)


	if(location.state.train) return (<>  
		{/*Train details from here */}
		<div className="">

			<div className="flex flex-col">
				<div className="flex justify-center gap-12 md:px-12 md:py-4 px-4 py-4 mt-4 text-cyan-500 font-semibold text-lg">
					<span>{train.number}</span>
					<span>{train.name}</span>
				</div>
				
				<div className="md:flex justify-center md:p-8 md:gap-16 font-semibold p-4">
					<div className="text-sky-500 gap-4">
						<span className="flex justify-center">{stations.boarding.stationName}</span>
						<div className="flex gap-2 p-2 justify-center">
							<span className="px-2">{stations.boarding.arrivalTime}</span>
							<div className="border-b-2 border-cyan-700 h-[0px] mt-2.5 w-[50px]"></div>
							<span className="px-2">{stations.boarding.departureTime}</span>
						</div>
						<span className="flex justify-center">Stops for {stations.boarding.stoppageTime} minutes</span>
					</div>

					<div className="text-indigo-600 md:p-0 p-4">
						<span className="flex justify-center p-4">To</span>
					</div>

					<div className="text-sky-600 ">
						<span className="flex justify-center">{stations.destination.stationName}</span>
						<div className="flex gap-2 justify-center p-2">
							<span className="px-2">{stations.destination.arrivalTime}</span>
							<div className="border-b-2 border-cyan-700 h-[0px] mt-2.5 w-[50px]"></div>
							<span className="px-2">{stations.destination.departureTime}</span>
						</div>
						<span className="flex justify-center">Stops for {stations.destination.stoppageTime} minutes</span>
					</div>
				</div>

				<div className="flex flex-col justify-center p-1">
						<span className="flex justify-center text-lg font-semibold text-cyan-600 p-1 ">Runs On </span>
						<div className="flex gap-2 justify-center">
							{datesToHide.map((item , dayIndex) => 
							<span key={dayIndex} className="flex py-1 text-sky-700 font-semibold"
								>{weekdays[item].name}{dayIndex<rundays.length-1?',':''}</span>
							)}

						</div>	
						<span className="flex justify-center text-sm text-indigo-600">(from {stations.boarding.stationName})</span>
				</div>
			</div>
		</div>
		{/*this section is for class information */}
		<div className="p-4">
			<div className="p-4 flex flex-col">
				<span className="flex justify-center text-cyan-500 font-semibold text-lg">Ticket Class Information</span>
				<div className="flex justify-center gap-4 mt-4 text-indigo-600 font-semibold">
					<span>{selectedClass.classType}</span>
					<span>Available Seats : {selectedClass.totalSeats-selectedClass.bookedSeats}</span>
				</div>
				<span className="flex justify-center text-indigo-600 font-semibold hover:text-red-700">Fare: Rs. {(distance * (selectedClass.fareRatio?selectedClass.fareRatio:selectedClass.fairRatio)).toFixed(2)}</span>
			</div>
		</div>


		{/*from here user information and ticket information is required */}
		<form action="" className="md:p-16 p-8">
			<div className="">
				<div className="flex justify-center items-center">
					<span className="p-2 font-semibold text-cyan-600 flex text-center">Please Enter following details for ticket booking.</span>
				</div>
				<div className="flex justify-center px-4 py-8">
					<div className=""> 
						<div className="p-4 flex flex-col mt-4">
							<span className="p-2 font-semibold text-cyan-600">Select Travel Date</span>
							<div className="flex items-center gap-3">
								<span className="flex text-center p-2 mt-3 text-cyan-500">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
									</svg>
								</span>	
								<DatePicker 

									mapDays={({ date }) => {
								    let props = {} 
								    if (!(datesToHide.includes(date.weekDay.index))) props.hidden = true //this is to hide weekdays on which train does not run
								    if(daysToHide.includes(date.day)) props.hidden = true // this is to hide days which have passed from current date
								    return props
								 	 }}
									value={date} name="date" onChange={setDate}
								inputClass="custom-input custom-calendar"
								 />
							</div>
						</div>

					 <div className="flex flex-col py-8 rounded-lg">
					 	<span className="text-cyan-500 font-semibold mt-6 px-2 py-2">Enter details of person(s)</span>
					 	<span className="italic text-sky-700 mb-4">let's say you are booking tickets for 2 people then you have to enter details of two people</span>
					 	
					 	{ userInfo.map((userItem , index) => 
					 	<div key={index} className="grid lg:grid-cols-2 mt-8 shadow-sm border-2 bg-slate-900 border-slate-700 rounded-xl px-8 py-2">
					 		<div className="p-2 flex flex-col">
						 		<span className="text-sky-500 p-2">Name</span>
						 		<div className="flex">
						 			<span className="-mr-10 p-1 text-sky-500">
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
										</svg>
						 			</span>
						 			<input type="text" name="name" value = {userItem.name} 
								 		onChange = {event => handleUserInputs(event , index) }
								 		className="outline-0 py-2.5 px-4 border border-slate-700 text-sky-400 rounded-lg w-[400px] bg-slate-900"
								 		/>
						 		</div>
					 		</div>
						 	
						 	<div className="p-2 flex flex-col">
						 		<span className="text-sky-500 p-2">Age</span>
							 	<div className="flex">
						 			<span className="-mr-10 p-1 text-sky-500">
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
										</svg>
						 			</span>
						 			<input type="text" value={userItem.age} name="age"
							 		onChange = {event => handleUserInputs(event , index) }
							 		className="outline-0 py-2.5 px-4 border border-slate-700 text-sky-400 rounded-lg w-[400px] bg-slate-900"
								 		/>
						 		</div>
						 	</div>
						 	<div className="p-2 flex flex-col ">
						 		<span className="text-sky-500 p-2">Phone</span>
						 		<div className="flex">
						 			<span className="-mr-10 p-1 text-sky-500">
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
										</svg>
						 			</span>
						 			<input type="text" value= {userItem.phone} name="phone"
								 		onChange = {event => handleUserInputs(event , index) }
								 		className="outline-0 py-2.5 px-4 border border-slate-700 text-sky-400 rounded-lg w-[400px] bg-slate-900"
								 		/>
						 		</div>
						 	</div>
						 	<div className="p-2 flex flex-col ">
						 		<span className="text-sky-500 p-2">E-mail</span>
						 		<div className="flex">
						 			<span className="-mr-10 p-1 text-sky-500">
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
										</svg>
						 			</span>
						 			<input type="email" value={userItem.email} name="email"
								 		onChange = {event => handleUserInputs(event , index) }
								 		className="outline-0 py-2.5 px-4 border border-slate-700 text-sky-400 rounded-lg w-[400px] bg-slate-900"
								 		/>
						 		</div>
						 	</div>
						 	<div className="p-2 flex flex-col ">
						 		<span className="text-sky-500 p-2">Address</span>
						 		<div className="flex">
						 			<span className="-mr-10 p-1 text-sky-500">
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
										  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
										</svg>
						 			</span>
						 			<textarea value={userItem.address} name="address"
								 		onChange = {event => handleUserInputs(event , index) }
								 		className="outline-0 py-2 px-4 border border-slate-700 text-sky-400 rounded-lg w-[400px] bg-slate-900 h-24 resize-none"
								 		/>
						 		</div>
						 	</div>
						 	<div className=" flex flex-col justify-center mt-8 md:px-16">
						 		<button className="flex justify-center p-2.5 text-red-600 hover:text-slate-300 hover:font-semibold hover:bg-red-600 gap-4 border-red-800 border rounded-lg"
						 			onClick = {(e) => removeSpecificUser(e,index) }
						 			><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
									</svg>Remove</button>
						 	</div>
					 	</div>
					 	)}

					 	<div className="flex mt-8 px-2 justify-center">
						 		<button className="flex justify-center gap-4 bg-slate-900 hover:bg-slate-950 border border-gray-700 p-2.5 rounded-lg w-full text-blue-400 hover:font-semibold mx-12 lg:mx-36"
						 				onClick={(e) => addAnotherUser(e)}
						 				>
						 				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
										</svg>Add Another Person</button>
						 	</div>
					 	
					 </div>

					 <div className="flex items-center gap-4 mt-12 shadow-2xl">
					 	<button onClick={(e) => processReservationInformation(e)} 
					 		className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6 mx-auto py-2 border border-sky-700 hover:border-transparent hover:bg-blue-700 text-b-400 hover:font-semibold rounded-full w-auto"
					 		>Next
					 		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
							</svg></button>

					 	<NavLink to={"/"} 
					 	className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6 mx-auto py-2 border border-sky-700 hover:border-transparent hover:bg-blue-700 text-b-400 hover:font-semibold rounded-full w-auto">
					 	 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
						</svg>Search Again</NavLink>
					 </div>
				</div>
				</div>
			</div>
		</form>

	 </>)

	else return (<> 
		<div className="flex flex-col items-center shadow-2xl font-semibold text-red-500 text-lg p-16 md:p-24 backdrop-brightness-200">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200 shadow-2xl hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}

export default ReservationDetails