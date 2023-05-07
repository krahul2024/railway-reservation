import React from 'react'
import { NavLink ,useNavigate , useLocation} from 'react-router-dom'


const TrainList  = (props) => {
	const navigate = useNavigate() 
	const location = useLocation() 

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
	
	console.log(location.state) 
	const trainsList  = location.state.trains
	// console.log(trainsList)
	const stations = location.state.station
	// console.log(stations)

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

	// console.log(getArrivalTime(stations.start.name , 0))
	//----------------Sending data to the train details page as we need to know the name of train when user clicks on a particular train--------------------

	if(location.state.trains)return (<> 

		<div className="flex flex-col px-8 justify-center shadow-2xl mb-8 mt-16">
					<span className="font-semibold text-2xl text-sky-600 text-center shadow-2xl px-16">Results for your train search</span>
					<span className="text-indigo-600 text-center shadow-2xl px-16 py-4">You can select the train for ticket booking by clicking on show train details.</span>
		</div>

		<div className="top-20 flex justify-center shadow-2xl">
			
			<form action="" className="mt-24 mb-24 shadow-2xl">
				
				{trainsList.map((train,index) => 
				<div key={index} className="p-3 rounded-md shadow-2xl md:w-[870px] lg:w-[1130px] lg:px-28 lg:py-6 w-[500px] hover:shadow-2xl">
					<div className="md:flex md:gap-12 p-2">
						<div className="flex font-semibold md:gap-6 gap-4 text-cyan-500 justify-center shadow-2xl md:mt-4">
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
								<div className="border-b-2 border-cyan-700 h-[0px] w-[120px]"></div>
								<div className="flex flex-col px-1">
									<span className="px-4">{stations.end?stations.end.code:getLastStation(train).stationCode}</span>
									<span className="px-1">{stations.end?getArrivalTime(stations.end.name,index):getLastStation(train).arrivalTime}</span>
								</div>
							</div>
							</span>
						</div>

						<div className="flex flex-col mt-4 items-center">
							<span className="text-sky-500 font-semibold text-center mb-2">Running Days</span>
							<div className="mt-2 mb-3">
								{train.runningDays.map((days , dayIndex) => 
									<span key={dayIndex} 
										className={`px-2 py-1 border-2 border-cyan-700 ${dayIndex==0?'rounded-md':'border-l-transparent rounded-md'} text-sky-600  brightness-150 shadow-2xl`}
										>{weekdays[days.index].short}</span>
									)}
							</div>
						</div>

					</div>

					<div className="md:flex md:gap-8 gap-2 justify-center shadow-2xl">
						<div className="flex justify-center"
						>{
							train.classes.map((item , idx) => 
							<div key={idx} className="flex flex-col justify-around hover:font-bold p-1 shadow-2xl text-cyan-500 rounded-lg w-[120px] text-center md:h-[63px] h-[80px]">
								<span className="">{item.classType}</span>
								<span className="text-emerald-500">Avl. {item.totalSeats-(Math.floor(Math.random()*30)+item.bookedSeats)}</span>
							</div>

						)}</div>

						<div className="flex justify-center md:p-2">
							<div key={index} 
								className="flex text-center p-2 cursor-pointer text-cyan-500 rounded-lg shadow-2xl hover:font-bold hover:shadow-2xl hover:backdrop-brightness-105"
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
				)}
			</form>

		</div>


		</>)

		else return (<> 
		<div className="flex flex-col items-center shadow-2xl font-semibold text-red-500 text-lg p-16 md:p-24 backdrop-brightness-200">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200 shadow-2xl hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}


export default TrainList 