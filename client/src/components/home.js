import React , { useState , useEffect , useContext } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { MultiSelect } from 'react-multi-select-component'
import DatePicker from "react-multi-date-picker"
import './styles.css'
import { UserContext} from '../userContext.js'
import baseUrl from './baseUrl.js'

const Home = () => {
	const navigate = useNavigate() 
	const { stations } = useContext(UserContext) 
	const location = useLocation()
	//---------------------------fetching list of all the classes and stations--------------------------
	let [classList, setClassList] = useState([{}])
	let [stationList, setStationList] = useState([])
	let [trainsList , setTrainsList] = useState([])
	let [classes , setClasses] = useState([])

	const fetchStations = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/station_list`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		
		const data = await response.json() 

		if(!data.success) throw new Error("Error while fetching list of Stations.")

		// console.log(data)
		for(let i=0;i<data.stations.length;i++){
			const value = stationList 
			if(value.length<data.stations.length) 
				value.push(data.stations[i])
			setStationList(value)
		}

		}
		catch(error) {
			console.log(error) 
			// window.alert(error) 
		}
	}
	useEffect(() => {
		fetchStations() 
	},[])
	// console.log({stations})
	console.log({stationList})

	const fetchClasses = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/class_list`,{
			method:'GET',
			headers:{
				"Content-Type":"application/json"
			}
		})
		const data = await response.json() 
		// console.log(data)
		if(!data.success) throw new Error("Error while fetching list of classes.")
		for(let i=0;i<data.classes.length;i++){
			const value = classList 
			if(value.length<data.classes.length) 
				value.push({value:data.classes[i].classType,label:data.classes[i].classType})
			setClassList(value) 
		}

		// console.log("abc",classList)
	}
	catch(error) { 
		console.log(error) 
		// window.alert(error)
	}
	}
	useEffect(() => {
		fetchClasses() 
	},[])

	const fetchTrains = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/train_list`,{
				method:"GET",
				headers:{
					"Content-Type":"application/json"
				}
			})

			const data = await response.json() 
			if(!data.success) throw new Error("There was an error trying to fetch the list of trains. Please try again later.")

			// console.log(data)
			for(let i=0;i<data.trains.length;i++){
				if(trainsList.length < data.trains.length) {
					const values = trainsList 
					values.push(data.trains[i])
					setTrainsList(values) 
				}
			}
		}
		catch(error) {
			console.log(error)
			// window.alert("There was an error trying to fetch the list of trains! Please try again later.")
			navigate("/")
		}
	}

	useEffect(() => {
		fetchTrains()
	},[])


	//--------------------------------states for all the inputs---------------------------------------------

	let [startStation , setStartStation] = useState({
		value:"" , show:false
	})
	let [endStation , setEndStation] = useState({
		value:"",show:false
	})
	let [trainNumber , setTrainNumber] = useState({
		value:"",show:false
	})
	let [trainName , setTrainName] = useState({
		value:"",show:false
	})
	let [date , setDate] = useState(null)

	let [suggestions , setSuggestions] = useState([])

	const handleStart = ( text) => {
		if(text) {
			const resultList = stationList.filter((item) => {
				const term = text.toLowerCase() , value = item.name.toLowerCase() 
				return value.includes(term) 
			})
			while(resultList.length >5 ) resultList.pop() 
			setSuggestions(resultList)
		}
		setStartStation({value:text,show:true})
	}

	const handleEnd = (text) => {
		if(text) {
			const resultList = stationList.filter((item) => {
				const term = text.toLowerCase() , value = item.name.toLowerCase() 
				return value.includes(term)
			})
			while(resultList.length >5 ) resultList.pop() 
			setSuggestions(resultList)
		}
		setEndStation({value:text,show:true})
	}

	const handleTrainName = (text) => {

		if(text) {
			const values = trainsList.filter((item) => {
				const value = item.name.toLowerCase() , term = text.toLowerCase()
				return value.includes(term) 
			})
			if(values.length <= 5) setSuggestions(values) 
		}
		setTrainName({value:text , show:true}) 
 	}

 	const handleTrainNumber = (text) => {

		if(text) {
			const values = trainsList.filter((item) => {
				return item.number.includes(text) 
			})
			if(values.length <= 5) setSuggestions(values) 
		}
		setTrainNumber({value:text , show:true})

	}

	// console.log(startStation,endStation)

	let dateInfo = null 

	if(date){
		dateInfo = {
			date:{
				day:date.day,
				month:date.month.name,
				year:date.year
			},
			weekday:{
				name:date.weekDay.name,
				index:date.weekDay.index
			},
			month:{
				name:date.month.name,
				index:date.month.index
			}
		}
	
		console.log('Selected Date:',dateInfo)
	}

	const handleAllInputs = async (e) => {
		e.preventDefault() 
		try{
			const train = {
			name:trainName.value, 
			number:trainNumber.value ,
			classes , 
			start:startStation.value,
			end:endStation.value
		}

		console.log(train)

		//from here sending the data to server 
		const response = await fetch(`${baseUrl}/train/search_trains`,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				train , date:dateInfo
			})
		})

		const data = await response.json() 
		if(!data.success){ 
			window.alert(data.msg)  
			throw new Error(data.msg) 
		}
		console.log(data) 
		// directing to the page which will show list of all the trains 
		if(data.size === 0){
			window.alert("No trains found for the input provided! Please try with different input.")
		 	navigate("/")
		 	window.location.reload()
		}
		else {
		navigate("/train_list" ,{
			state:{
				trains:data.trains,
				station:data.station,
				dt:dateInfo
			}
		})
		}
	}
		catch(error) {
			console.log(error) 
		}
		
	}

console.log(date) 

//  this is for hiding past dates 
let current_date = new Date().getDate(), daysToHide = []  
for(let i=0;i<current_date;i++) daysToHide.push(i) 
	console.log(daysToHide) 


	return ( <> 

		<div className="p-4 flex flex-col justify-center shadow-lg text-center shadow-sm">
			<span className="p-2 font-bold text-2xl text-cyan-600">Welcome To e-rail</span>
			<span className="italic text-sky-600 brightness-105">you can search trains using either station name of train details.</span>
		</div>

		<div className="flex justify-center items-center mt-48 md:mt-6 h-screen rounded-lg ">
			<form action="">
			 <div className="shadow-lg rounded-lg mt-6 p-12 brightness-100">
{/*--------------------------------------for boarding station and destination station----------------------------------------*/}
				
				<div className="md:flex mt-24 gap-12 justify-center shadow-lg">
					<div className="flex flex-col p-4 mt-8 justify-center ">
						<span className="text-cyan-500 font-semibold text-md">Boarding Station</span>
						<div className="flex items-center gap-3 ">
							<span className="-mr-8 -mb-1 text-sky-600">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
								  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
								</svg>
							</span>		
							<input type="text"  name="start" 
							onChange = {event => handleStart(event.target.value)}
							value = {startStation.value} 
							className="text-indigo-600 outline-0 border-b-2 mt-2 px-8 py-1 bg-transparent border-sky-700 w-[260px] lg:w-[300px] hover:border-indigo-600"
							/>
							</div>
								{startStation.show && suggestions && suggestions.map((suggestion , index) => 
								<div key={index}
								className="p-2 bg-transparent border-slate-800  hover:bg-slate-950 hover:text-cyan-500 hover:font-semibold shadow-2xl border-2 border-b-transparent rounded-md text-indigo-600"
									onClick = {() => {
										setStartStation({value:suggestion.name,show:false})
										setSuggestions([])
									}}
								 >{suggestion.name}</div>

								)}
					</div>
					{/*-------------for displaying to-------------------*/}
					<div className="flex flex-col p-1 md:mt-8 mt-3 justify-center md:ml-4 md:mr-4 mr-36">
						<span className="text-center text-indigo-500 md:ml-0 ">To</span>
					</div>
					{/*------------------for destination station-------------------*/}
					<div className="flex flex-col p-4 md:mt-8 mt-3 justify-center relative">
						<span className="text-cyan-500 font-semibold text-md">Destination Station</span>
						<div className="flex items-center gap-3 ">
							<span className="-mr-8 -mb-1 text-sky-600">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
								  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
								</svg>
							</span>	
							<input type="text"  name="end" value = {endStation.value}
									 onChange={(event) => handleEnd(event.target.value) }
									
								className="text-indigo-600 outline-0 border-b-2 mt-2 px-8 py-1 border-b-2 mt-2 bg-transparent border-sky-700 shadow-md w-[260px] lg:w-[300px] hover:border-indigo-600"
								/>
						</div>
								{ endStation.show && suggestions && suggestions.map((suggestion, index)=> 
								<div key={index} 
								className="p-2 bg-transparent border-slate-800  hover:bg-slate-950 hover:text-cyan-500 hover:font-semibold shadow-2xl border-2 border-b-transparent rounded-md text-indigo-600"
									onClick={()=> {
										setEndStation({value:suggestion.name , show:false}) 
										setSuggestions([])
									}}
									>
									{suggestion.name}
								</div>
								)}
							
					</div>
				</div>
{/*----------------------------------------This section is for class selection-----------------------------------------------------*/}
				<div className="flex flex-col mt-8 p-2 justify-center md:px-10 px-4">
					<h1 className="text-sky-600 mt-2 font-semibold ml-1">Select Ticket Classes(optional)</h1>
					<div className="flex items-center">
						<span className="text-sky-600 gap-6">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-7 h-7">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
							  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</span>		
						<MultiSelect 
						className="rmsc text-indigo-500 md:w-[300px] w-[280px] px-2 py-3"
						options = {classList}
						value={classes}
						onChange={setClasses}
						labelledBy="select classes.."
						/>
					</div>

					<div className="p-4 flex flex-col mt-4">
						<span className="p-2 font-semibold text-cyan-600">Select Travel Date</span>
						<div className="flex items-center gap-3">
							<span className="flex text-center p-2 mt-3 text-cyan-500">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
								</svg>
							</span>		
							<DatePicker
								mapDays={({ date }) => {
								    let props = {}  
								    if(daysToHide.includes(date.day)) props.hidden = true // this is to hide days which have passed from current date
								    return props
								 	 }}
							 value={date} name="date" onChange={setDate}
							inputClass="custom-input custom-calendar"
							 />
						</div>
						
					</div>
					
				</div>

				
				

{/*-----------------------------this section is for train name and number----------------------------------------------*/}
				<div className="md:flex md:gap-12 gap-4 mt-8 p-2 rounded-lg">
					<div className="flex flex-col p-4 mt-8 justify-center ">

						<div className="mb-8 shadow-2xl">
							<span className="text-sky-600 font-bold text-lg p-1">Search using <i>Train Name</i> or <i>Train Number</i></span>
						</div>

						<div className="md:flex ">
							<div className="flex flex-col ">
								<span className="text-cyan-500 font-semibold text-md">Train Number</span>
								<div className="flex gap-2 mt-2">
									<span className="-mr-10 text-sky-600">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M30 25H2v2h2v2h2v-2h5v2h2v-2h5v2h2v-2h5v2h2v-2h3v-2zM8 16H2v-2h6v-2H2v-2h6a2.002 2.002 0 0 1 2 2v2a2.002 2.002 0 0 1-2 2z"/><path fill="currentColor" d="m28.55 14.23l-8.58-7.864A8.977 8.977 0 0 0 13.888 4H2v2h10v4a2.002 2.002 0 0 0 2 2h9.156l4.042 3.705A2.472 2.472 0 0 1 25.528 20H2v2h23.527a4.473 4.473 0 0 0 3.023-7.77ZM14 10V6.005a6.977 6.977 0 0 1 4.618 1.835L20.975 10Z"/></svg>
									</span>
									<input name="number" value={trainNumber.value}
										onChange = {(e) => handleTrainNumber(e.target.value)}
										className="text-indigo-600 outline-0 border-b-2 py-2 px-12 bg-transparent border-sky-700 shadow-md w-[260px] lg:w-[300px] hover:border-indigo-600" type="text"
										/>
								</div>
								
									{
									trainNumber.show && suggestions && suggestions.map((item , index) => 

										<div key={index} onClick = {() => {
											setTrainNumber({value:item.number , show:false})
											setSuggestions([])
										}}
										className="p-2 bg-transparent border-slate-800  hover:bg-slate-950 hover:text-cyan-500 hover:font-semibold shadow-2xl border-2 border-b-transparent rounded-md text-indigo-600"
										>{item.number} {item.name}</div>
									)}
							</div>

							<div className="flex flex-col p-1 md:mt-8 mt-1 justify-center md:ml-4 md:px-12 md:py-1 py-2 px-20">
								<span className="text-center text-indigo-500 md:ml-0 px-12">or</span>
							</div>

							<div className="flex flex-col ">
								<span className="text-cyan-500 font-semibold text-md">Train Name</span>
								<div className="flex gap-2 mt-2">
									<span className="-mr-10 text-sky-600">
										<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M30 25H2v2h2v2h2v-2h5v2h2v-2h5v2h2v-2h5v2h2v-2h3v-2zM8 16H2v-2h6v-2H2v-2h6a2.002 2.002 0 0 1 2 2v2a2.002 2.002 0 0 1-2 2z"/><path fill="currentColor" d="m28.55 14.23l-8.58-7.864A8.977 8.977 0 0 0 13.888 4H2v2h10v4a2.002 2.002 0 0 0 2 2h9.156l4.042 3.705A2.472 2.472 0 0 1 25.528 20H2v2h23.527a4.473 4.473 0 0 0 3.023-7.77ZM14 10V6.005a6.977 6.977 0 0 1 4.618 1.835L20.975 10Z"/></svg>
									</span>
									<input name="name" value = {trainName.value} onChange={(e) => handleTrainName(e.target.value)}
										className="text-indigo-600 outline-0 border-b-2 py-2 px-12 bg-transparent border-sky-700 shadow-md w-[260px] lg:w-[300px] hover:border-indigo-600" type="text"
										/>
								</div>
									{
									trainName.show && suggestions && suggestions.map((item , index) => 
										<div key={index} 
											onClick = {() => {
												setTrainName({value:item.name , show:false})
												setSuggestions([])
											}}
											className="p-2 bg-transparent border-slate-800  hover:bg-slate-950 hover:text-cyan-500 hover:font-semibold shadow-2xl border-2 border-b-transparent rounded-md text-indigo-600"

										>{item.number} {item.name}</div>

									)}
							</div>
						</div>
					</div>
				</div>
				</div>
{/*--------------------this section is for submission of all the inputs-------------------------------*/}

				<div className="p-2 flex justify-center mb-12 mt-8">
					<button  onClick = {(e) => handleAllInputs(e)}
					  className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6 py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-full w-auto">
					  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
					  	<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					  </svg>
					  show trains 
					</button>
				</div>
			</form>
		</div>


		</> )
}


export default Home 