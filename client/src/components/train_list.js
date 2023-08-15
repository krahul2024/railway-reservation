import React , { useState } from 'react'
import { NavLink ,useNavigate , useLocation} from 'react-router-dom'


const TrainList  = (props) => {
	const navigate = useNavigate() 
	const location = useLocation() 

	const [criteria , setCriteria] = useState('jTime')
	const [order ,setOrder] = useState(true)

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
	
	const present = {
	    time: {
	        hour: Date().split(' ')[4].split(':')[0],
	        minute: Date().split(' ')[4].split(':')[1]
	    },
	    day: {
	        index: new Date().getDate(),
	        weekday: Date().split(' ')[0]
	    },
	    month: {
	        index: new Date().getMonth(),
	        name: Date().split(' ')[1]
	    },
	    year: Date().split(' ')[3]
	}
	let addFactor = 0 

	for(let i=0;i<weekdays.length;i++){
		if(present.day.weekday === weekdays[i].short) {
			addFactor = weekdays[i].index
			break
		}
	}

	const trainsList  = location?.state?.trains
	const sDate = location?.state?.dt?.date?.day || 0 
	let diff = 0 
	if(sDate) diff = sDate - present.day.index 

	console.log({sDate})
	for(let i=0;i<trainsList.length;i++){
		for(let j=0;j<trainsList[i].runningDays.length;j++){
			let temp_value = trainsList[i].runningDays[j]  
			temp_value.date = 0 
			temp_value.date = temp_value.index + present.day.index - addFactor
			temp_value.date += (Math.floor(diff/7)*7)
			if(temp_value.date < sDate || temp_value.date < present.day.index) temp_value.date+=7 
			// temp_value.date = temp_value.date % 31 + 1   
			trainsList[i].runningDays[j] = temp_value
		}
		trainsList[i].runningDays.sort((a,b) => a.date-b.date >=0 ? 1 : -1)
	}
	
	console.log({trainsList})
	const stations = location.state.station
	console.log(stations)

	const getArrivalTime = (station , index) => {
		const routes = trainsList[index].route 
		let time = ''
		routes.map((item)=> {
			if(station === item.stationName) time = item.arrivalTime
			return true 
		})
		return time 
	} 

	const getLastStation = (train) => {
		const routes = train.route 
		let lastRoute = routes[routes.length-1]
		return lastRoute 
	}

	const getFirstStation = (train) => {
		const routes = train.route 
		let firstRoute = routes[0]
		return firstRoute
	} 

	// this is for implementation of sorting trains based on travel-time
	// filters are based on travel-time , departure-time , arrival-time , no-of-days

	for(let i=0;i<trainsList.length;i++){
		let train = trainsList[i] , bTime = 0 , aTime = 0 ,
			 days = train.runningDays.length , jTime = 0 , 
			 	firstStation = stations.start?stations.start.code:getFirstStation(train).stationCode, 
			 	  lastStation = stations.end?stations.end.code:getLastStation(train).stationCode , first , last
		for(let i=0;i<train.route.length;i++){
			if(firstStation === train.route[i].stationCode ) first = train.route[i]
			if(lastStation === train.route[i].stationCode) last = train.route[i]
		}
			 	 let at = last.arrivalTime.split(':') , bt = first.departureTime.split(':') 
		// updating all the values for sorting 
		 	aTime = parseInt(at[0]) * 60 + parseInt(at[1])
		 	bTime = parseInt(bt[0]) * 60 + parseInt(bt[1])
		 	if(first.day===last.day) jTime = aTime - bTime 
		 	else if(first.day !== last.day) {
		 		console.log(first.day , last.day)
		 		jTime = aTime - bTime + 1440*(parseInt(last.day) - parseInt(first.day))
		 	}

		 	trainsList[i].aTime = aTime 
		 	trainsList[i].bTime = bTime 
		 	trainsList[i].jTime = jTime
	}

	if(criteria === 'jTime'){
		order && trainsList.sort((a,b) => a.jTime - b.jTime) 
		!order && trainsList.sort((a,b) => a.jTime - b.jTime) 
	}
	if(criteria === 'aTime'){
		order && trainsList.sort((a,b) => a.aTime - b.aTime) 
		!order && trainsList.sort((a,b) => b.aTime - a.aTime) 
	}
	if(criteria === 'bTime'){
		order && trainsList.sort((a,b) => a.bTime - b.bTime) 
		!order && trainsList.sort((a,b) => b.bTime - a.bTime) 
	}


	// console.log({trainsList})


	// console.log(getArrivalTime(stations.start.name , 0))
	//----------------Sending data to the train details page as we need to know the name of train when user clicks on a particular train--------------------

	if(location.state.trains)return (<> 

		<div className="flex flex-col px-8 justify-center  mb-8 mt-16">
					<span className="text-md text-2xl text-sky-600 text-center px-16">Results for your train search</span>
					<span className="text-indigo-600 text-center  px-16 py-4">You can select the train for ticket booking by clicking on show train details.</span>
		</div>

		<div className="xl:flex justify-center gap-6">
			<span className="flex px-6 py-3 justify-center text-md text-center font-extrabold text-sky-500">Select filters to sort trains based on mentioned criterias.</span>
			<div className="flex px-8 py-2 justify-center gap-8 ">
				<select name="criteria" onChange = { (e) => setCriteria(e.target.value) }
					className="flex justify-center outline-0 border-2 border-sky-600 bg-transparent px-4 py-1.5 rounded-md text-sky-500 text-md ">
					<option value="jTime" disabled selected className="bg-slate-900 border-sky-700 text-sky-500 text-md hover:text-indigo-500 ">Select a Criteria</option>
					<option value="bTime"  className="bg-slate-900  border-sky-700 text-sky-500 text-md hover:text-indigo-500 hover:bg-transparent">Boarding Time</option>
					<option value="aTime" className="bg-slate-900  border-sky-700 text-sky-500 text-md hover:text-indigo-500">Arrival Time</option>
					<option value="jTime" className="bg-slate-900 border-sky-700 text-sky-500 text-md hover:text-indigo-500">Journey Time</option>
				</select>

				{/*<select name="order" onChange = { (e) => setOrder(e.target.value) }
					className="flex justify-center outline-0 border-2 border-sky-600 bg-transparent px-4 py-1.5 rounded-md text-sky-500 text-md ">
					<option value={true} disabled selected className="bg-slate-900 border-sky-700 text-sky-500 text-md hover:text-indigo-500 ">Select Order</option>
					<option value={true}  className="bg-slate-900  border-sky-700 text-sky-500 text-md hover:text-indigo-500 hover:bg-transparent">Ascending</option>
					<option value={false} className="bg-slate-900  border-sky-700 text-sky-500 text-md hover:text-indigo-500">Descending</option>
				</select>*/}
			</div>
		</div>

		<div className="flex flex-col justify-center ">
			<form action="" className="mb-12 mt-6">
				
				{trainsList.map((train,index) => ( 
				<div className="flex justify-center px-2 py-2">
					<div key={index} className="p-3 rounded-md  w-auto shadow-sm w-auto">
						<div className="md:flex justify-center py-2 md:py-4 gap-4 lg:gap-8 px-12">
							<div className="flex text-md md:gap-6 gap-4 text-cyan-500 justify-center md:mt-4">
								<span>{train.number}</span>
								<span>{train.name}</span>
							</div>

							<div className="flex justify-center font-medium text-cyan-400 mt-4 md:-mt-2">
								<span className="flex flex-col justify-center">
								<div className="flex items-center  text-centerd gap-2">
									<div className="flex flex-col px-1">
										<span className="px-4">{stations.start?stations.start.code:getFirstStation(train).stationCode}</span>
										<span className="px-1">{stations.start?getArrivalTime(stations.start.name,index):getFirstStation(train).arrivalTime}</span>
									</div>
									<div className="px-12 border-b-2 border-cyan-700 h-[0px] w-auto"></div>
									<div className="flex flex-col px-1">
										<span className="px-4">{stations.end?stations.end.code:getLastStation(train).stationCode}</span>
										<span className="px-1">{stations.end?getArrivalTime(stations.end.name,index):getLastStation(train).arrivalTime}</span>
									</div>
								</div>
								</span>
							</div>

							<div className="flex flex-col mt-4 items-center">
								<span className="text-sky-500 text-md text-center mb-2">Running Days</span>
								<div className="mt-2 mb-3">
									{train.runningDays.map((days , dayIndex) => 
										<span key={dayIndex} 
											className={`px-2 py-2.5 border-2 border-cyan-700 ${dayIndex==0?'rounded-md':'border-l-transparent rounded-md'} text-sky-600  brightness-125 `}
											>
												<span className="px-1">{days.date}</span>
												<span className="text-lg">{weekdays[days.index].short}</span>
												
											</span>
										)}
								</div>
							</div>

						</div>

						<div className="md:flex md:gap-8 gap-2 justify-center ">
							<div className="flex justify-center"
							>{
								train.classes.map((item , idx) => 
								<div key={idx} className="flex flex-col px-8 py-3 lg:px-12 justify-around hover:font-bold  text-cyan-500 rounded-lg w-auto text-center ">
									<span className="">{item.classType}</span>
									<span className="text-emerald-500">Avl. {item.totalSeats-(Math.floor(Math.random()*30)+item.bookedSeats)}</span>
								</div>

							)}</div>

							<div className="flex justify-center md:p-2">
								<div key={index} 
									className="flex text-center p-2 cursor-pointer text-cyan-500 rounded-lg  hover:font-bold hover: hover:backdrop-brightness-105"
									 onClick = {() => {
									 	navigate("/train_details", {
									 		state:{
									 			train:train,
									 			startCode:stations.start?stations.start.code:getFirstStation(train).stationCode,
									 			endCode:stations.end?stations.end.code:getLastStation(train).stationCode
									 		}
									 	})
									 }}
										>Show Train Details
								</div>
							</div>
							
						</div>
					</div>
				</div>
				 ))}
			</form>

		</div>


		</>)

		else return (<> 
		<div className="flex flex-col items-center  text-md text-red-500 text-lg p-16 md:p-24 backdrop-brightness-100">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200  hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}


export default TrainList 