import React , { useState } from 'react'
import { NavLink , useLocation  , useNavigate } from 'react-router-dom'
import DatePicker from "react-multi-date-picker"
import './styles.css'

const TrainDetails = (props) => {
	const location = useLocation()
	const navigate = useNavigate() 
	const train = location.state.train , endCode = location.state.endCode ,startCode = location.state.startCode
	// console.log("Train:" , train)
	let endRoute = '' , startRoute = '' , distance=0 
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

	//function to find stations 
	const getStations = () => {
		const routes = train.route  
		let borderStations = {
			first:routes[0] ,
			last:routes[routes.length -1]
		}
		return borderStations
	}

	// for getting details of start and end stations which user searched for 

	if(endRoute === '' || startRoute === '' ){
	train && train.route.map((item) =>  {
			if(item.stationCode === endCode) endRoute = item 
			if(item.stationCode === startCode) startRoute = item 
		})
	}

	console.log(train)

	distance = endRoute.distanceUpto - startRoute.distanceUpto 

	console.log(endCode , startCode ,endRoute , startRoute)

	const addition_value = startRoute.day
	// console.log({addition_value})
	let date_now = new Date() , daysToHide = []
	date_now = date_now.getDate()  //this date is for masking all the dates in calendar till today's date as we aren't allowed to book tickets for days before today
	for(let i=0;i<date_now;i++) daysToHide.push(i) 
	let datesToHide = [] , rundays = train.runningDays 
	for(let i=0;i<rundays.length;i++)datesToHide.push((rundays[i].index+addition_value)%7) 
	datesToHide.sort((a,b) => a>b?1:-1) 
	console.log(datesToHide)

	if(location.state.train)return (<> 
		<div className=" py-4 backdrop-blur-3xl ">
			<form action="">
				{/*for showing train basic details*/}
					<div className="px-12 py-8 mb-8 rounded-xl brightness-125 backdrop-brightness-200 contrast-100">
						<div className="flex justify-center font-bold text-xl p-2 shadow-2xl">
							<span className="text-cyan-500 px-4 py-4 shadow-2xl">{train.number}</span>
							<span className="text-center text-cyan-500 px-4 py-4 shadow-2xl">{train.name}</span>
						</div>

						<div className="flex justify-center font-semibold text-sky-700 mt-4">
							<span className="flex items-center gap-4">
								<div className="flex flex-col px-8">
									<span className="px-1 text-center">{startRoute.stationName}({getStations().first.stationCode})</span>
									<span className="px-1 text-center">{startRoute.arrivalTime}</span>
								</div>
								<div className="border-y rounded-3xl lg:px-12 md:px-8 px-4 border-indigo-900 h-[0px] md:w-[170px] w-[120px]">
								</div>
									<div className="flex flex-col px-8">
									<span className="px-1 text-center">{endRoute.stationName}({getStations().last.stationCode})</span>
									<span className="px-1 text-center">{endRoute.arrivalTime}</span>
								</div>
								</span>
						</div>

						<div className="flex flex-col justify-center p-1">
							<span className="flex justify-center text-lg font-semibold text-cyan-600 p-1 mt-3">Runs On </span>
							<div className="flex gap-2 justify-center">
								{datesToHide.map((dayItem , dayIndex) => 
								<span key={dayIndex} className="flex py-1 text-sky-700 font-semibold"
									>{weekdays[dayItem].name}{dayIndex<train.runningDays.length-1?',':''}</span>
								)}
							</div>	
							<span className="flex justify-center text-sm text-indigo-600">(from {startRoute.stationName})</span>
						</div>
					</div>


					<div className="px-12 py-4 rounded-lg mt-2 flex flex-col items-center">
						<span className="text-sky-600 font-extrabold text-lg p-3">
							Information about the train...
						</span>

						<div className="flex justify-center grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 py-4 px-2">
						{ train.classes.map((classItem) => 
						  	<div className="flex-col py-1 w-[340px] brightness-125 backdrop-brightness-200 contrast-125 shadow-2xl ">
						  		<div className="px-3 flex gap-10">
						  			<span className="px-4 py-4 text-md font-extrabold text-sky-700">Class</span>
						  			<span className="px-4 py-4 text-md font-extrabold text-sky-700">Available Seats</span>
						  		</div>
						  		<div className="px-3 flex gap-20">
						  			<span className="px-4 py-2 text-md font-semibold text-indigo-800 brightness-150">{classItem.classType}</span>
						  			<span className="px-4 py-1 text-md font-semibold text-indigo-800 brightness-150 px-16">{classItem.totalSeats- Math.floor(classItem.totalSeats*Math.random()+5)%30 + classItem.bookedSeats}</span>
						  		</div>
						  		<div className="p-2 flex gap-4">
						  			<span className="px-2 py-1 text-md font-semibold text-indigo-600 text-center">Fare: Rs. {(distance *( classItem.fareRatio?classItem.fareRatio:classItem.fairRatio)).toFixed(2)}</span>
						  			<span onClick = { () => {
						  				navigate("/reservation_details",{
						  					state:{
						  						train:train ,
						  						endRoute,
						  						startRoute,
						  						class:classItem
						  					}
						  				})
						  			} }
						  				className="flex justify-items-center text-center cursor-pointer px-3 py-1.5 border border-sky-900 hover:border-transparent hover:bg-indigo-800 hover:text-gray-800 font-semibold text-sky-700 rounded-full w-auto"
						  					>Get Tickets</span>
						  		</div>
						  	</div>
						 )}

						</div>

					</div>


				{/* from here showing train time table*/}

				<div className="flex justify-center ">
					
					<div className="w-[700px] md:w-[860px] lg:w-[1020px] xl:w-[1160px] rounded-lg px-12 py-8">
						<table className="">
							<thead className="bg-slate-900 text-sky-400 border border-slate-700 rounded-lg text-md border-2">
							<tr>
								<th className="md:px-6 px-4 py-6 text-center">Station Name</th>
								<th className="md:px-6 px-4 py-6 text-center">Arrival Time</th>
								<th className="md:px-6 px-4 py-6 text-center">Departure Time</th>
								<th className="md:px-6 px-4 py-6 text-center">Stoppage Time(in minutes)</th>
								<th className="md:px-6 px-4 py-6 text-center">Distance Covered(in KMs)</th>
								<th className="md:px-6 px-4 py-6 text-center">Day</th>
							</tr>
							</thead>

							<tbody className="text-slate-300 text-md backdrop-brightness-100">
								{ train.route.map((routeItem) => 
								<tr className="bg-slate-900 border border-slate-700 hover:font-semibold hover:text-cyan-500 hover:shadow-lg hover:border hover:border-slate-800 hover:rounded-xl hover:backdrop-blur-xl">
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.stationName} ({routeItem.stationCode})
									</td>
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.arrivalTime}
									</td>
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.departureTime}
									</td>
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.stoppageTime}
									</td>
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.distanceUpto}
									</td>
									<td className="md:px-6 px-4 py-6 text-center">
										{routeItem.day}
									</td>
								</tr>
								)}
							</tbody>
						</table>
						
					</div>

				</div>



			</form>
		</div>

		</>)

	else return (<> 
		<div className="flex flex-col items-center shadow-2xl font-semibold text-red-500 text-lg p-16 md:p-24 backdrop-brightness-200">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200 shadow-2xl hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}


export default TrainDetails