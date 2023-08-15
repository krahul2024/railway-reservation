import React , {useState  ,useEffect} from 'react'
import { NavLink, useNavigate , useLocation } from 'react-router-dom'
import baseUrl from './baseUrl.js'

const AddTrain = () => {
//------------------basic information about the server url and variable declaration for various inputs------------------------------------------------
	
	const location = useLocation()
	const navigate = useNavigate()
	const train_details = location?.state?.train 

	let [train , setTrain] = useState({
		name:train_details?.name||"eg. Patna - Guwahati express" ,
		 number:train_details?.number || "eg. 13054"
	})

	const [run , setRun] = useState(train_details?.runninDays || []) // this is for list of days on which the train is running

	const classes = train_details?.classes
	const [classInput, setClassInput] = useState(classes?classes:[{
		classType:"AC-2",totalSeats:50,fairRatio:4,show:true
	}])

	const routes = train_details?.route  

	const [routeInput, setRouteInput] = useState(routes?routes:[{
		stationName:"Patna",
		arrivalTime:"22:45" ,
		 stoppageTime:0,
		 distanceUpto:0,
		 show:true,
		 stationCode:"PNB"
	}]) 


	
//---------------------------setting/handling inputs recieved from user---------------------------------------------
	const handleTrainInputs = (event) => {
		const name = event.target.name , value = event.target.value 
		setTrain({...train , [name]:value})
	}

	const handleClassInputs = (index , event) => {
		console.log(index,event.target.name,event.target.value)
		const values = [...classInput]
		values[index][event.target.name] = event.target.value 
		setClassInput(values) 

	}

	const handleRouteInputs = (index , event) => {
		// console.log(index,event.t00)
		const values = [...routeInput] 
		values[index][event.target.name] = event.target.value 	
		setRouteInput(values)
	}
//-------------------------Adding extra classes and routes on demand--------------------------------------------
	const addAnotherRoute = (event) => {
		event.preventDefault()
			setRouteInput([...routeInput , {
				stationName:"Patna",arrivalTime:"22:45" , stoppageTime:0,distanceUpto:0
				 }])
		}

	const addAnotherClass = (event) => {
		event.preventDefault()
		setClassInput([...classInput , {
			classType:"AC-2",totalSeats:50,fareRatio:4
		}])
	}
//-------------------removing classes and routes on demand-----------------------------------------------------
	const removeSpecificClass = (event , index ) => {
		event.preventDefault()
		const values  = [...classInput]
		values.splice(index , 1) 
		setClassInput(values) 
	}

	const removeSpecificRoute = (event , index ) => {
		event.preventDefault() 
		const values = [...routeInput]
		values.splice(index , 1)
		setRouteInput(values) 
	}

//-----------------------------sending train data to the api for addition of the train-----------------------
	const sendTrainData = async (event) => {
		console.log("Train Information:\n",train,"\nRoute Information:",routeInput,"\nClass Information:",classInput , {run})
		event.preventDefault() 
		const response = await fetch(`${baseUrl}/train/add_train`,{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
			},
			body:JSON.stringify({
					name:train.name,
					number:train.number,
					classes:classInput,
					route:routeInput , 
					runningDays:run  ,
					id:train_details?._id
			})
		})

		const data = await response.json() 
		console.log(data) 
		window.alert(data.msg)
		if(data.success) navigate('/info')
	}

//----------------fetching list of stations and classes and showing classes and stations suggestions -------------------------------------

	let [stationList , setStationList] = useState([])
	let [classList ,setClassList] = useState([])
	let [suggestions ,setSuggestions] = useState([])
	let [classSuggestions , setClassSuggestions] = useState([])

	const fetchStations = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/station_list`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		})

		const data = await response.json() 
		if(!data.success) throw new Error("There was an error fetching list of stations.")
		for(let i=0;i<data.stations.length;i++){
			const value = stationList 
			if(value.length < data.stations.length) 
				value.push(data.stations[i])
			setStationList(value)
		}
	} catch(err) {
		console.log(err) 
		window.alert("There was an error")
	}
		

	} 
	useEffect(() => {
		fetchStations() 
	},[])

	const fetchClasses = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/class_list`,{
				method:"GET",
				headers:{
					"Content-Type":"application/json"
				}
			})

			const data = await response.json() 
			if(!data.success) throw new Error('There was an error while fetching list of all the classes.')
				console.log(data.classes)
			for(let i=0;i<data.classes.length;i++){
				// console.log(data.classes[i])
				const value = classList 
				if(value.length <= i) 
					value.push(data.classes[i])
				setClassList(value) 
			}

			// console.log(classList)
		}
		catch(err) {
			console.log(err)
			window.alert('There was an error while fetching list of classes.')
		}
	}
	useEffect(() => {
		fetchClasses() 
	},[])




	const handleStationName = (index , text,code) => {
		if(text) {
		const resultList = stationList.filter((item) => {
				const value = item.name.toLowerCase() , term = text.toLowerCase() 
				return value.includes(term )
			})
		console.log(resultList.length)
		while(resultList.length > 5) resultList.pop() 
		console.log(resultList.length)
		setSuggestions(resultList) 
		}
		const values = [...routeInput] 
		values[index] = {
			stationName:text,
			arrivalTime:values[index].arrivalTime,
			stoppageTime:values[index].stoppageTime,
			distanceUpto:values[index].distanceUpto,
			show:true,
			stationCode:code
		}
		setRouteInput(values)
	}


	const handleClassType = (index , text)  => {
		if(text) {
			const resultList = classList.filter((item) => {
				const value = item.classType.toLowerCase() , term = text.toLowerCase() 
				return value.includes(term) 
			})
			setClassSuggestions(resultList) 
		}
		const values = [...classInput] 
		values[index] = {
			classType:text,
			fareRatio:values[index].fareRatio,
			totalSeats:values[index].totalSeats,
			show:true
		}
		setClassInput(values)
	}

	console.log({stationList} , {classList})

	const setRunningDays = (e) => {
		const checked = e.target.checked , value = e.target.value  
		// console.log({checked } , {value })
		let runDays = run 
		if(checked && !runDays.includes(value)) runDays.push(value) 
		else if(!checked && runDays.includes(value)) runDays = runDays.filter( item => item !== value) 
		setRun(runDays.sort()) //setting the values of a train running on a particular day or list of days
		// console.log(runDays)
	}
//---------------------------------fetching and showing list of stations and classes ends here-------------------------------------------------------------------



	return ( <> 

		<div className="p-4 flex justify-center mt-4 scale-90">

			<form method="post" className="p-2 rounded-lg">
{/*-------------------------This section contains headings and a subheading --------------------------------------*/}
				<div className="flex flex-col items-center rounded-lg">
					<h1 className="text-sky-600 text-3xl font-bold">{train_details?`Update ${train_details?.name}`:'Add A Train'}</h1>
					<span className="text-cyan-500 flex italic text-center">Enter following information about the train you want to {train_details?'update':'add'}</span>
				</div>

{/*---------------------------This section contains basic information about the train----------------------------*/}
				<div className="flex flex-col p-8 rounded-lg mt-16 " >
					<span className="text-cyan-500 text-xl font-semibold">Enter basic information about train</span>
					
					<div className="lg:flex gap-16 items-center bg-slate-900 p-8 mt-4 rounded-lg w-auto">
						<div className="flex flex-col">
							<span className="mt-8 p-1 text-indigo-500 font-semibold">Name of the train</span>
							<input 
							className="outline-0 w-[400px] border-b border-sky-700 text-md p-1 mt-2 px-3 text-indigo-600 bg-transparent " 
							type="text" value={train.name} name="name"
							onChange={handleTrainInputs}
							/>
						</div>
						
						<div className="flex flex-col">
							<span className="md:mt-8 mt-3 p-1 text-indigo-500 font-semibold">Train Number</span>
							<input 
							className="outline-0 w-[400px] border-b border-sky-700 text-md p-1 md:mt-2 px-3 text-indigo-600 bg-transparent " 
							type="text" value={train.number} name="number"
							 onChange={handleTrainInputs}
							/>
						</div>
					</div>
					<div className="p-3 flex-col justify-start">
						<span className="font-semibold text-sky-600">Running days for the train</span>
						<div className="p-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 flex justify-center gap-2 mx-auto">
							<label htmlFor="" 
								className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto">
								<input type="checkbox" value = "1" onChange = {setRunningDays}  className="cursor-pointer accent-gray-800"
									/>
								Monday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "2" className="cursor-pointer accent-gray-800"
									 />
								Tuesday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								 className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "3" className="cursor-pointer accent-gray-800"
									/>
								Wednesday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								 className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "4" className="cursor-pointer accent-gray-800"
									/>
								Thursday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								 className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "5" className="cursor-pointer accent-gray-800"
									 />
								Friday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								 className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "6" className="cursor-pointer accent-gray-800"
									/>
								Saturday
							</label>
							<label htmlFor="" onChange = {setRunningDays}
								 className="flex border-2 px-4 py-1 rounded-lg border-sky-700 cursor-pointer gap-2 w-auto ">
								<input type="checkbox" value = "0" className="cursor-pointer accent-gray-800"
									/>
								Sunday
							</label>
						</div>
						
					</div>
				</div>


{/*-----------------------------------This section is about adding different classes a train can have -----------------------*/}
			    <div className=" p-8 mt-12">
			    	<div className="flex flex-col p-2">
			    		<h1 className="text-sky-600 text-xl font-semibold">Add Classes</h1>
			    		<span className="text-cyan-500 italic ">You have to provide information about different categories of classes which the train has.</span>
			    	</div>
			    {
			    	classInput.map((classField,index)=>(
					<div key={index} className="md:flex gap-16 bg-slate-900 p-8 mt-4 rounded-lg">
				    		<div className="flex flex-col">
								<span className="md:mt-8 mt-3 p-1 text-indigo-500 font-semibold">Type of the class</span>
								<input 
								className="outline-0 w-[200px] border-b border-sky-700 text-md p-1 md:mt-2 px-3 text-indigo-600 bg-transparent " 
								type="text" value={classInput[index].classType} name="classType"
								onChange={(e) => handleClassType(index , e.target.value )}
								/>
								{
									classInput[index].show && classSuggestions && classSuggestions.map((item , idx) => 
										<div className=" rounded-sm px-3 w-[150px] bg-slate-800 hover:bg-slate-900 text-indigo-500 hover:text-cyan-500 hover:shadow-xl hover:font-semibold p-2 border-b-2 border-gray-700"
											key={idx} onClick={ (e) => {
												const values = [...classInput] 
												values[index] = {
													classType:item.classType ,
													fareRatio:values[index].fareRatio,
													totalSeats:values[index].totalSeats,
													show:false
												}
												setClassInput(values) 
												setClassSuggestions([])
											}}
											>
											{item.classType}
										</div>
										)
								}

							</div>

							<div className="flex flex-col">
								<span className="md:mt-8 mt-3 p-1 text-indigo-500 font-semibold">Total number of seats</span>
								<input 
								className="outline-0 w-[180px] border-b border-sky-700 text-md p-1 md:mt-2 px-3 text-indigo-600 bg-transparent " 
								type="text" value={classField.totalSeats} name="totalSeats"
								onChange={event => handleClassInputs(index,event)}
								/>
							</div>

							<div className="flex flex-col">
								<span className="md:mt-8 mt-3 p-1 text-indigo-500 font-semibold">Fare ratio (Rs. per km)</span>
								<input 
								className="outline-0 w-[200px] border-b border-sky-700 text-md p-1 md:mt-2 px-3 text-indigo-600 bg-transparent " 
								type="text" value={classField.fareRatio} name="fareRatio"
								onChange={event => handleClassInputs(index,event)}
								/>
							</div>

							<div className="md:flex flex-col ">
								<button className="w-[150px] hover:text-cyan-400 hover:bg-slate-700 text-cyan-500 bg-gray-800 p-2.5 rounded-lg font-bold md:mt-20 mt-12"
									onClick={ (event) => removeSpecificClass(event,index) }
									>Remove it</button>
							</div>
				    	</div>

			    		))
			    }	
			    	

			    	<button onClick={(event) => addAnotherClass(event)} 
			    	      className="w-[200px] hover:text-cyan-400 hover:bg-slate-700 text-cyan-500 bg-gray-800 p-2.5 rounded-lg font-bold mt-8"
			    	      >Add Another Class</button>

			    </div>

{/*------------------------------This section is for adding different intermediate stations to the route -------------------------*/}

				<div className=" mt-8 p-8 flex flex-col ">
					<h1 className="text-sky-600 text-xl font-bold ">Add route for the train</h1>
					<span className="text-cyan-500 italic">Route contains intermediate stations, intermediate stations can be added using  <strong> add a route </strong>  option</span>
					
					{ routeInput.map((routeField , index) => (
						<div key={index} className="mt-10 bg-slate-900 p-8 rounded-lg">
							<h1 className="text-cyan-600 text-lg font-semibold ">{
								index===0?"Start station details":"Intermediate station details"}</h1>
							<div className="2xl:flex xl:gap-8">
								<div className="mt-4 md:flex gap-16">
									<div className="flex flex-col">
										<span className="mt-6 p-1 text-indigo-500 font-semibold">Station Name</span>
										<input 
										className="outline-0 w-[400px] border-b border-sky-700 p-1 md:mt-2 text-md px-3 text-indigo-600 bg-transparent " 
										type="text" value={routeInput[index].stationName} name="stationName"
										onChange={event => handleStationName(index,event.target.value)}
										/>
										{
											routeInput[index].show && suggestions && suggestions.map((suggestion,idx)=> 
												<div key={idx} onClick={() => {
													const values = [...routeInput]
													values[index]={
														stationName:suggestion.name,
														arrivalTime:values[index].arrivalTime,
														stoppageTime:values[index].stoppageTime,
														distanceUpto:values[index].distanceUpto,
														show:false,
														stationCode:suggestion.code
													}
													setRouteInput(values)
													setSuggestions([])
												}}
													className=" rounded-sm px-3 w-[300px] bg-slate-800 hover:bg-slate-900 text-indigo-500 hover:text-cyan-500 hover:shadow-xl hover:font-semibold p-2 border-b-2 border-gray-700"
													>
													{suggestion.name}
												</div>

												)
										}

									</div>
									
									<div className="flex flex-col">
										<span className="md:mt-6 mt-3 p-1 text-indigo-500 font-semibold">Arrival Time</span>
										<input 
										className="outline-0 w-[400px] border-b border-sky-700 text-md p-1 mt-2 px-3 text-indigo-600 bg-transparent " 
										type="text" value={routeField.arrivalTime} name="arrivalTime"
										onChange={event => handleRouteInputs(index,event)}
										/>
									</div>
								</div>

								<div className="mt-4 md:flex gap-16">
									<div className="flex flex-col">
										<span className="md:mt-6 p-1 text-indigo-500 font-semibold">Stoppage time (in minutes)</span>
										<input 
										className="outline-0 w-[170px] border-b border-sky-700 p-1 md:mt-2 text-md px-3 text-indigo-600 bg-transparent " 
										type="text" value={routeField.stoppageTime} name="stoppageTime"
										onChange={event => handleRouteInputs(index,event)}
										/>
									</div>
									
									<div className="flex flex-col">
										<span className="md:mt-6 mt-3 p-1 text-indigo-500 font-semibold">Distance covered(from start station in kms.)</span>
										<input 
										className="outline-0 w-[200px] border-b border-sky-700 text-md p-1 mt-2 px-3 text-indigo-600 bg-transparent " 
										type="text" value={routeField.distanceUpto} name="distanceUpto"
										onChange={event => handleRouteInputs(index,event)}
										/>
									</div>

									<div className="flex flex-col">
										<button 
											onClick = { (event ) => removeSpecificRoute(event , index) }
											className="w-[150px] hover:text-cyan-400 hover:bg-slate-700 text-cyan-500 bg-gray-800 p-2.5 rounded-lg font-bold md:mt-20 mt-12">Remove it</button>
									</div>
								</div>
							</div>
							
						</div>
						))}

					<button onClick={(event) => addAnotherRoute(event)} 
						className="w-[230px] hover:text-cyan-400 hover:bg-slate-700 text-cyan-500 bg-gray-800 p-2.5 rounded-lg font-bold mt-8"
						>Add Another Station</button>
				</div>

{/*--------------------------------------------This section contains submit button which will send submit request to an api--------------------------------------*/}
				<div className="flex items-center justify-center gap-12">
					<button onClick={sendTrainData} 
						className="px-3 py-2 bg-cyan-900 hover:bg-cyan-800 rounded-full shadow-lg w-[200px] "
						>{train_details?'Update Train':'Add Train'}</button>

					<NavLink to={"/info"} 
						className="px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded-full shadow-lg w-[200px] text-center"
						>Cancel</NavLink>
				</div>
				
			</form>
		</div>

		</> )

}

export default AddTrain 