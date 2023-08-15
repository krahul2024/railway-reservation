import React , {useState , useContext } from 'react'  
import { NavLink , useLocation , useNavigate } from 'react-router-dom'  
import baseUrl from './baseUrl.js'


const PnrStatus = () => {

	const [pnr , setPnr] = useState('') 
	const [station , setStation] = useState(null)
	const [status , setStatus] = useState(null) 
	const [success , setSuccess] = useState(false)

	const showPnrStatus = async(e) => {
		e.preventDefault()  
		// console.log({pnr}) 
		const response = await fetch(`${baseUrl}/train/pnr_status`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					pnr
				})
			})
		const result = await response.json()  
		console.log(result) 
		if(!result.success) alert(result.msg) 
		if(result.success) setStatus(result) 
		setSuccess(result.success)
	}

	console.log({status})

	const base_date = status?.date.day.value - status?.stations.boarding.day  
	
	const cancelTicket = async(e) => {
		e.preventDefault() 
		console.log({pnr})

		if(window.confirm('Are you sure to cancel the ticket?')){
			const response = await fetch(`${baseUrl}/train/cancel_ticket`,{
					method:"POST",
					credentials:"include",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({
						pnr
					})
				})
			const result = await response.json() 
			alert(result.msg) 
			window.location.reload()
			console.log({result})
		}
		else alert('Your ticket will not be cancelled.')	
	}

	return (<> 

		<div className="flex  flex-col p-16 justify-center">
			<span className="p-4 font-semibold text-md text-sky-600">Enter pnr number mentioned on your ticket.</span>
			<div className="py-1 px-6">
				<input type="text" valule={pnr} placeholder="enter pnr value" name="pnr" onChange = {(e) => setPnr(e.target.value)}
					className="flex py-2.5 px-8 outline-0 bg-transparent border border-sky-900 rounded-md text-md text-indigo-600"
					/>
			<div className="flex mt-4 gap-2">
					<button onClick = {(e) => showPnrStatus(e)}
						className="flex text-sky-600 border-2 px-4 py-1 bg-transparent border-sky-700 rounded-lg hover:bg-blue-600 hover:text-black hover:border-transparent hover:font-semibold"
						>{status?'search another PNR ' : 'Show Status'} </button>
					<NavLink to = "/" className="flex text-center text-sky-600 border-2 px-5 py-1 bg-transparent border-sky-700 rounded-lg hover:bg-blue-600 hover:text-black hover:border-transparent hover:font-semibold"
						>Go to homepage</NavLink>
				</div>

			{
				!success && (
					<span className="px-4 py-1 mt-8 flex justify-items-center text-red-500 ">No such pnr exists. Please enter valid pnr.</span>
					)
			}

			{ success && status && (
			<div>
				<div>
					<div className="flex p-2 gap-2">
						<span className="px-4 py-1 mt-8 flex justify-items-center text-green-500 ">Seat Status : {status.seat_status} </span>
						<button onClick = { (e) => cancelTicket(e) }
							className="px-4 py-1 mt-8 text-red-500 text-md font-semibold border-red-600 border-2 rounded-lg flex text-center hover:bg-red-600 hover:border-transparent hover:text-black"
							>Cancel Ticket</button>
					</div>
					<span className="px-4 py-1 flex justify-items-center text-green-500 ">Seat No. : {status.seat} </span>
					<span className="px-4 py-1 flex justify-items-center text-green-500 ">Train Status : {status.train_status} </span>
					{status.presentStation && (<span className="px-4 py-1 flex justify-items-center text-green-500 font-semibold">Next stop is: {status.presentStation.stationName}</span>)}
				</div>
				{
					status && status.stations && (
						<div className="flex flex-col justify-items-center px-4 py-2 text-green-500">
							<span>Boarding from : {status.stations.boarding.stationName} ({status.stations.boarding.stationCode}) at {status.stations.boarding.departureTime} on <strong>{status.date.day.value} {status.date.month.name} {status.date.year}</strong></span>
							<span>Arriving at : {status.stations.destination.stationName} ({status.stations.destination.stationCode}) at {status.stations.destination.arrivalTime}</span>
						</div>
						)
				}
				<div className="flex flex-col justify-center">
					<span className="px-4 py-1 mt-8 flex justify-items-center text-sky-500 text-lg font-semibold">For running status Please refer to train time table provided below</span>
					
					<div className="text-blue-600 mt-6 flex justify-items-center">
						<table className="">
							<tr className="">
								<th className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">Station</th>
								<th className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">Arrival-Time</th>
								<th className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">Departure-Time</th>
								<th className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">Stops for (in minutes)</th>
								<th className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">Date</th>
							</tr>
							<tbody className="px-4">
							{ status.train.route.map((route , index) => (
								<tr className="hover:bg-blue-500 hover:text-black text-cyan-500">
									<td className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">{route.stationName}</td>
									<td className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">{route.arrivalTime}</td>
									<td className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">{route.departureTime}</td>
									<td className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">{route.stoppageTime}</td>
									<td className="px-2 py-3 border-2 text-center border-sky-800 rounded-md">{base_date + route.day}</td>
								</tr>
								) )}

							</tbody>
						</table>
					</div>
					
				</div>
			</div>

				


				)}
				
			</div>
		</div>


		</>)
}

export default PnrStatus  