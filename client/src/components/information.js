import React , { useState , useEffect} from 'react'  
import {NavLink , useNavigate , useLocation } from 'react-router-dom'
import baseUrl from './baseUrl.js'

// this page will be displayed only if the logged in person has admin access
// contents are list of stations , trains , classes


const Information = () => {

	const navigate = useNavigate() 
	const location = useLocation() 


	const [trains , setTrains] = useState([])
	const [stations , setStations] = useState([])
	const [classes , setClasses] = useState([])
	const [showTrain , setShowTrain] = useState(2)
	const [showClass , setShowClass] = useState(2) 
	const [showStation , setShowStation] = useState(2) 
	const [searchClass , setSearchClass] = useState('')
	const [searchStation , setSearchStation] = useState('')
	const [searchTrain , setSearchTrain] = useState('')
	const [trainSuggestions , setTrainSuggestions] = useState([])

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
			// console.log({data})
			setStations(data.stations)
		}
		catch(error) {
			console.log(error) 
			// window.alert(error) 
		}
	}

	const fetchTrains = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/train_list`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		
			const data = await response.json() 
			if(!data.success) throw new Error("Error while fetching list of Stations.")
			setTrains(data.trains)
		}
		catch(error) {
			console.log(error) 
			// window.alert(error) 
		}
	}

	const fetchClasses = async () => {
		try{
			const response = await fetch(`${baseUrl}/train/class_list`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		
			const data = await response.json() 
			if(!data.success) throw new Error("Error while fetching list of Stations.")
			// console.log({data})
			setClasses(data.classes)
		}
		catch(error) {
			console.log(error) 
			// window.alert(error) 
		}
	}

	useEffect(() => {
		fetchClasses() 
		fetchTrains()
		fetchStations()

	},[])

	// console.log({stations} , {classes} , {trains})


	const setTrainValue = (e) => {
		e.preventDefault() 
		if(showTrain === 2) setShowTrain(trains.length) 
		else if(showTrain > 2) setShowTrain(2) 
	}

	const setClassValue = (e) => {
		e.preventDefault() 
		if(showClass === 2) setShowClass(classes.length) 
		else if(showClass > 2) setShowClass(2) 
	}

	const setStationValue = (e) => {
		e.preventDefault() 
		if(showStation === 2) setShowStation(stations.length) 
		else if(showStation > 2) setShowStation(2) 
	}

	const suggest = (e , text) => {
		e.preventDefault() 

	}

	const editClass = (e , index) => {
		e.preventDefault() 
		console.log(classes[index])
		navigate('/add_class' , {
			state:{
				class:classes[index]
			}
		})
	}
	const deleteClass = async(e , index) => {
				e.preventDefault() 
		try{
			const response = await fetch(`${baseUrl}/train/delete_class`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					id:classes[index]._id
				})
			})

			const result = await response.json() 
			if(!result.success) throw new Error(result.msg)
			alert(result.msg)
			navigate("/info")
			window.location.reload()
		}
		catch(error) {
			console.log(error) 
			error.message?window.alert(error.message):window.alert("There was an error deleting the class! Please try again later.")
		}
	}

	const editStation = (e , index) => {
		e.preventDefault() 
		console.log(stations[index])
		navigate('/add_station' , {
			state:{
				station:stations[index]
			}
		})
	}
	const deleteStation = async(e , index) => {
				e.preventDefault() 
		try{
			const response = await fetch(`${baseUrl}/train/delete_station`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					id:stations[index]._id
				})
			})

			const result = await response.json() 
			if(!result.success) throw new Error(result.msg)
			alert(result.msg)
			navigate("/info")
			window.location.reload()
		}
		catch(error) {
			console.log(error) 
			error.message?window.alert(error.message):window.alert("There was an error deleting the class! Please try again later.")
		}
	}

	const editTrain = (e , index) => {
		e.preventDefault() 
		console.log(trains[index])
		navigate('/add_train' , {
			state:{
				train:trains[index]
			}
		})
	}
	const deleteTrain = async(e , index) => {
				e.preventDefault() 
		try{
			const response = await fetch(`${baseUrl}/train/delete_train`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					id:trains[index]._id
				})
			})

			const result = await response.json() 
			if(!result.success) throw new Error(result.msg)
			alert(result.msg)
			navigate("/info")
			window.location.reload()
		}
		catch(error) {
			console.log(error) 
			error.message?window.alert(error.message):window.alert("There was an error deleting the class! Please try again later.")
		}
	}

	return (<>

		<div className='flex flex-col items-center justify-center p-6'>
			<div className="">
				<div className="flex justify-between">
						<div className="flex justify-between items-center px-8 py-2 text-xl font-bold ">
							<span className="text-sky-600">Trains</span>
							<NavLink to = "/add_train" 
								className="mt-1 p-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-sky-600">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</NavLink>
						</div>
						
						<label>
							<input type="text" placeholder="Search Trains" onChange = {(e) => {
								setSearchTrain(e.target.value) 
							}}
								className="flex outline-0 mt-2 bg-transparent border-sky-700 border-b-2 rounded-full px-4 py-1 text-sm text-indigo-600"
								/>
						</label>
					</div>
				<div 
					className="flex flex-col border-sky-900 gap-y-3 rounded-lg px-6 brightness-125 shadow-xl shadow-slate-950">
					<div className="p-1"></div>
					{trains.length>0 && trains.map((train , index) => (
						<>
							{index < showTrain && (
								<div className="flex px-4 py-3 bg-slate-900 text-sky-600 rounded-lg justify-between">
									<div>
										<div className="flex gap-4 text-sm px-4">
											<span>{train.number}</span>
											<span>{train.name}</span>
										</div>
										<div className="flex gap-4 px-4">
											<span className="text-sm text-blue-600">From</span>
											<span className="text-sm text-blue-600">{train.route[0].stationName}</span>
											<span className="text-sm text-blue-600">To</span>
											<span className="text-sm text-blue-600">{train.route[train.route.length-1].stationName}</span>
										</div>
									</div>
									<div className="flex gap-4 items-center justify-center">
										<button onClick = {(e) => editTrain(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Edit 
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
											</svg>
										</button>
										<button onClick = {(e) => deleteTrain(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Delete
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg>
										</button>
									</div>
								</div>
							)}
							{index === showTrain || index===trains.length-1 && (
								<> 
								{showTrain <= 2 && (
	 								<button onClick = { (e) => setTrainValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Expand Trains List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
										</svg>
									</button> 
								)}

								{showTrain > 2 && (
	 								<button onClick = { (e) => setTrainValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Collapse Trains List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
										</svg>
									</button> 
								)}

								</>
							)}
						</>
					))}


					<div className="flex justify-between">
						<div className="flex justify-between items-center px-8 py-3 text-xl font-bold ">
							<span className="text-sky-600">Classes</span>
							<NavLink to = "/add_class" 
								className="mt-1 p-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-sky-600">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</NavLink>
						</div>
						<label >
							<input type="text" placeholder="Search Classes" onChange = {(e) => {
								setSearchClass(e.target.value) 
							}}
								className="flex outline-0 mt-2 bg-transparent border-sky-800 border-b-2 rounded-full px-4 py-1 text-sm text-indigo-600"
								/>
						</label>
					</div>
					
					{classes.length>0 && classes.map((classItem , index) => (
						<>
							{index < showClass && (
								<div className="flex px-4 py-3 bg-slate-900 text-sky-600 rounded-lg justify-between">
									<div>
										<div className="flex flex-col text-sm px-4 gap-y-2">
											<div className="flex gap-3">
												<span>Name of the Class</span>
												<span className="text-indigo-600"> :  {classItem.classType}</span>
											</div>
											<div className="flex gap-3">
												<span>Fair Ratio for the Class</span>
												<span className="text-indigo-600"> :  {classItem.fairRatio}</span>
											</div>
											<div className="flex gap-3">
												<span>Total seats alloted to the Class</span>
												<span className="text-indigo-600"> :  {classItem.totalSeats}</span>
											</div>
										</div>
									</div>
									<div className="flex gap-4 items-center justify-center">
										<button onClick = {(e) => editClass(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Edit 
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
											</svg>
										</button>
										<button onClick = {(e) => deleteClass(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Delete
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg>
										</button>
									</div>
								</div>
							)}

							{index === showClass || index===classes.length-1 && (
								<> 
								{showClass <= 2 && (
	 								<button onClick = { (e) => setClassValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Expand Classes List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
										</svg>
									</button> 
								)}

								{showClass > 2 && (
	 								<button onClick = { (e) => setClassValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Collapse Classes List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
										</svg>
									</button> 
								)}

								</>
							)}
						</>
					))}

					<div className="flex justify-between">
						<div className="flex justify-between items-center px-8 py-3 text-xl font-bold ">
							<span className="text-sky-600">Stations</span>
							<NavLink to = "/add_station" 
								className="mt-1 p-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-sky-600">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</NavLink>
						</div>
						<label >
							<input type="text" placeholder="Search Stations" onChange = {(e) => {
								setSearchStation(e.target.value) 
							}}
								className="flex outline-0 mt-2 bg-transparent border-sky-700 border-b-2 rounded-full px-4 py-1 text-sm text-indigo-600"
								/>
						</label>
					</div>
					{stations.length>0 && stations.map((station , index) => (
						<>
							{index < showStation && (
								<div className="flex px-4 py-3 bg-slate-900 text-sky-600 rounded-lg justify-between">
									<div>
										<div className="flex flex-col text-sm px-4 gap-y-2">
											<div className="flex gap-3">
												<span>Name</span>
												<span className="text-indigo-600"> :  {station.name}</span>
											</div>
											<div className="flex gap-3">
												<span>Code</span>
												<span className="text-indigo-600"> :  {station.code}</span>
											</div>
											<div className="flex gap-3">
												<span>Address</span>
												<span className="text-indigo-600"> :  {station.address}</span>
											</div>
										</div>
									</div>
									<div className="flex gap-4 items-center justify-center">
										<button onClick = {(e) => editStation(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Edit 
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
											</svg>
										</button>
										<button onClick = {(e) => deleteStation(e,index)}
											className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
											 text-sky-700 rounded-lg w-fit"
											>Delete
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
											</svg>
										</button>
									</div>
								</div>
							)}

							{index === showStation || index===stations.length-1 && (
								<> 
								{showStation <= 2 && (
	 								<button onClick = { (e) => setStationValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Expand Stations List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
										</svg>
									</button> 
								)}

								{showStation > 2 && (
	 								<button onClick = { (e) => setStationValue(e) }
										className="flex items-center cursor-pointer px-4 py-1 mb-4 gap-2 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 
										 text-sky-700 rounded-lg w-fit"
										>
										Collapse Stations List 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
										</svg>
									</button> 
								)}

								</>
							)}
						</>
					))}
				</div>
			</div>
		</div>

	 </>)
}

export default Information