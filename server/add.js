import React , {useState , useNavigate } from 'react'
import { NavLink } from 'react-router-dom'

const AddTrain = () => {

	let [train , setTrain] = useState({
		name:"eg. Patna - Guwahati express" , number:"eg. 13054"
	})

	const [classInput, setClassInput] = useState([{
		type:"AC-2",totalSeats:50,fareRatio:4
	}])

	const [routeInput, setRouteInput] = useState([{
		stationName:"Patna",arrivalTime:"22:45" , stoppageTime:0,distanceUpto:0
	}])

	

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

	const addAnotherRoute = (event) => {
		event.preventDefault()
			setRouteInput([...routeInput , {
				stationName:"Patna",arrivalTime:"22:45" , stoppageTime:0,distanceUpto:0
				 }])
		}

	const addAnotherClass = (event) => {
		event.preventDefault()
		setClassInput([...classInput , {
			type:"AC-2",totalSeats:50,fareRatio:4
		}])
	}

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
		event.preventDefault() 
		const response = await fetch("train/add_train",{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
			},
			body:JSON.stringify({
					name:train.name,
					number:train.number,
					class:classInput,
					route:routeInput
			})
		})

		const data = await response.json() 
		console.log(data) 
	}



	return ( <> 

		<div className="p-4 flex justify-center mt-12 ">

			<form action="" className="p-2 rounded-lg">
{/*-------------------------This section contains headings and a subheading --------------------------------------*/}
				<div className="flex flex-col items-center rounded-lg">
					<h1 className="text-sky-600 text-3xl font-bold">Add A Train</h1>
					<span className="text-cyan-500 flex italic text-center">Enter following information about the train you want to add</span>
				</div>

{/*---------------------------This section contains basic information about the train----------------------------*/}
				<div className="flex flex-col p-8 rounded-lg mt-16 " >
					<span className="text-cyan-500 text-xl font-semibold">Enter basic information about train</span>
					
					<div className="md:flex gap-16 items-center bg-slate-900 p-8 mt-4 rounded-lg">
						<div className="flex flex-col">
							<span className=" mt-8 p-1 text-indigo-500 font-semibold">Name of the train</span>
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
								type="text" value={classField.type} name="type"
								onChange={event => handleClassInputs(index,event)}
								/>
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
										type="text" value={routeField.stationName} name="stationName"
										onChange={event => handleRouteInputs(index,event)}
										/>
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
						>Add Train</button>

					<NavLink to={"/"} 
						className="px-3 py-2 bg-blue-900 hover:bg-blue-800 rounded-full shadow-lg w-[200px] text-center"
						>Cancel</NavLink>
				</div>
				
			</form>
		</div>

		</> )

}

export default AddTrain 