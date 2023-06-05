import React , {UserContext , useState } from 'react'  

const Tickets = ({tickets }) => {

	const [show , setShow] = useState(false)

	const showTickets = () => {
		setShow(true) 
	}
	console.log({tickets})

	return (<>	
		<div className="flex justify-center">
			<div className={`${show?'m-2 border-2 border-sky-700 rounded-xl':''} flex justify-center`}>
			
			{
				!show && (
					<div>
						<button onClick = { (e) => showTickets(e) }
							className="flex text-sky-600 hover:text-slate-950 items-center gap-3 m-2 backdrop-brightness-150 px-6 py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-lg w-auto" 
						     >Reservations for {tickets[0].createdAt}</button>
					</div>
					)
			}
			{
				show && (
					<div className="p-4 flex flex-col justify-items-center mx-auto" >
					<span className="p-2 font-semibold text-green-500">Reservations for {tickets[0].createdAt.split(',')[0]}</span>
				{ show && tickets.length >0 && tickets.map((item , index) => (
					<div className="md:flex border-sky-700 border-2 mx-1 rounded-lg bg-slate-900 w-auto">
						<div id={`printTicket${index}`}  className="md:flex gap-2 justify-center brightness-125 px-8 py-10 m-3 rounded-2xl w-auto">
							
								<div className="flex flex-col gap-2">
									<span className="p-2 font-semibold text-green-500 text-lg">{item.user.name}</span>
									<div className="flex gap-2">
										<td className="text-md font-semibold text-sky-500">Booked On</td>
										<span className="text-cyan-600">:</span>
										<td className="text-blue-600">{item.createdAt.split(',')[0]}</td>
									</div>
									
									<div className="flex gap-2">
										<td className="text-md font-semibold text-sky-500">PNR</td>
										<span className="text-cyan-600">:</span>
										<td className="text-blue-600">{item.pnr}</td>
									</div>
									
								</div>

								<div className="flex flex-col justify-items-center mt-4">
									<td className="flex-col text-md font-semibold text-sky-500">Journey Details</td>
										<div className="px-3">
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Class</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">{`${item.jClass.classType} `}</td>
											</div>
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Ticket price</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">{`Rs. ${item.distance * (item.jClass.fairRatio?item.jClass.fairRatio:item.jClass.fareRatio) }`}</td>
											</div>
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Seat Number</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">{item.seat}</td>
											</div>
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Date</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">{`${item.date.day.value + item.stations.boarding.day} ${item.date.month.name} ${item.date.year}`}</td>
											</div>
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Boarding Station</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">
													{`${item.stations.boarding.stationName}(${item.stations.boarding.stationCode}) ${item.stations.boarding.arrivalTime} ${item.date.day.value } ${item.date.month.name} ${item.date.year}`} 
												</td>
											</div>
											<div className="flex gap-2">
												<td className="text-md font-semibold text-sky-500">Destination Station</td>
												<span className="text-cyan-600">:</span>
												<td className="text-blue-600">
													{`${item.stations.destination.stationName}(${item.stations.destination.stationCode}) ${item.stations.destination.arrivalTime} ${item.date.day.value + item.stations.destination.day} ${item.date.month.name} ${item.date.year}`} 
												</td>
											</div>
										</div>
									</div>
									<div className="flex flex-col gap-2 justify-items-center mt-4">
											<td className="text-md font-semibold text-sky-500">Person details</td>
											<td className="text-blue-600 px-3"> 
												<div className="flex gap-2">
													<td className="text-md font-semibold text-sky-500">Name</td>
													<span className="text-cyan-600">:</span>
													<td className="text-blue-600">{item.user.name} </td>
												</div>
												<div className="flex gap-2">
													<td className="text-md font-semibold text-sky-500">Age</td>
													<span className="text-cyan-600">:</span>
													<td className="text-blue-600">{item.user.age} </td>
												</div>
												<div className="flex gap-2">
													<td className="text-md font-semibold text-sky-500">E-mail</td>
													<span className="text-cyan-600">:</span>
													<td className="text-blue-600">{item.user.email} </td>
												</div>
												<div className="flex gap-2">
													<td className="text-md font-semibold text-sky-500">Phone</td>
													<span className="text-cyan-600">:</span>
													<td className="text-blue-600">{item.user.phone} </td>
												</div>
												<div className="flex gap-2">
													<td className="text-md font-semibold text-sky-500">Address</td>
													<span className="text-cyan-600">:</span>
													<td className="text-blue-600">{item.user.address} </td>
												</div>
											</td>
										</div>
								</div>
							</div>
					))}
					<div className="p-2">
						<button onClick = { (e) => setShow(false)}
							className="flex text-sky-600 hover:text-slate-950 items-center gap-3 bg-transparent px-6 py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-lg w-auto" 
						     >Collapse Reservations for {tickets[0].createdAt.split(',')[0]}</button>
					</div>
				</div>		
					)
			}
			
			</div>
		</div> 
	 </> )
}


export default Tickets 