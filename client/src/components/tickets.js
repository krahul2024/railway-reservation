import React, { useState , useEffect , useContext} from 'react'
import {NavLink , useLocation , useNavigate} from 'react-router-dom'
import { UserContext } from '../userContext.js'  
import JsPdf from 'jspdf'

const Tickets = () => {
	const {profile , setProfile } = useContext(UserContext) 
	let tickets = profile?profile.reservations[profile.reservations.length-1] : []
	console.log(tickets) 

const generatePdf = () => {
		const report = new JsPdf('portrait','pt','a2') 
		report.html(document.getElementById('printableSection')).then(() => {
			report.save('ticket.pdf') 
		})
	}

	const printTicketsByIndex = (e , index) => {
		e.preventDefault() 
		console.log(index) 
		const ticket = new JsPdf('portrait','pt','a3') 
		ticket.html(document.getElementById(`printTicket${index}`)).then(() => {
			console.log(ticket)
			ticket.save(`${tickets[index].user.name}.pdf`)
		})
	}

	const [hide , setHide] = useState(false)
	const [allTickets , setAllTickets] = useState("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ")
	const printAllTickets = (e) => {
		setHide(true) 
		setAllTickets("flex flex-col")
		const ticket = new JsPdf('portrait','pt','a1') 
		ticket.html(document.getElementById('printAllTickets')).then(() => {
			ticket.save('reservations.pdf')
			setHide(false) 
			setAllTickets("grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3")
		})
	}

	return (<> 
		{ profile && (
		<div className="flex flex-col p-8">
			<div className="flex justify-between">
				<div className="flex flex-col justify-items-center">
					<div className="px-8 font-bold text-xl text-orange-600">Your reservation(s)</div>
					<span className="px-10 mb-3 text-orange-600">visit profile to see all of your reservations</span>
				</div>
				<div className="flex justify-center">
					<button  onClick = { (e) => printAllTickets(e) } 
					  className="flex text-green-400 hover:text-black items-center gap-3 backdrop-brightness-150 px-3 border border-green-700 hover:border-transparent hover:brightness-125 hover:bg-blue-900 text-blue-500 hover:font-semibold rounded-xl w-auto">
						  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
						  </svg> Print All Tickets
					</button>
				</div>
			    
			</div>

			<div id="printAllTickets" className={`${allTickets} w-auto`}>
				{
					tickets.length >0 && tickets.map((item , index) => (
					<div >
						<div id={`printTicket${index}`}  className="flex flex-col justify-center brightness-125 px-8 py-10 m-3 rounded-2xl w-auto">
							<span className="p-2 font-semibold text-green-500 text-lg">Ticket for Person {index+1}</span>
							<div className="flex gap-2">
								<td className="text-md font-semibold text-sky-500">Booking Time </td>
								<span className="text-cyan-600">:</span>
								<td className="text-blue-600">{item.createdAt}</td>
							</div>
							<div className="flex gap-2">
								<td className="text-md font-semibold text-sky-500">PNR</td>
								<span className="text-cyan-600">:</span>
								<td className="text-blue-600">{item.pnr}</td>
							</div>

							<div className="flex flex-col justify-items-center">
								<td className="text-md font-semibold text-sky-500">Journey Details</td>
									<div className="px-12">
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
								<div className="flex flex-col gap-2 justify-items-center">
										<td className="text-md font-semibold text-sky-500">Person details</td>
										<td className="text-blue-600 px-12"> 
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

						{hide === false && ( 
							<div className="flex justify-center ">
								<button  onClick = { (e) => printTicketsByIndex(e,index)}
								  className="flex text-sky-600 hover:text-black items-center gap-3 backdrop-brightness-150 px-6 py-2 border border-sky-700 hover:border-transparent hover:brightness-125 hover:bg-blue-900 text-blue-500 hover:font-semibold rounded-xl w-auto">
								  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
								  </svg> print ticket
								</button>
							</div> )} 
						</div>
						))
				}

			</div>
		</div>
			)}

	 </>)
}

export default Tickets