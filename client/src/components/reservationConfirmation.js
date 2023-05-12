import React , { useState ,useEffect , useContext} from 'react'  
import { NavLink , useNavigate , useLocation } from 'react-router-dom'
import {UserContext } from '../userContext.js'
import JsPdf from 'jspdf'

const ReservationConfirmation = () => {

	const location = useLocation() 
	const navigate = useNavigate() 
	const {profile , setProfile} = useContext(UserContext) 
	const resInfo = location.state.resInfo
	const train = resInfo.train, stations = resInfo.stations 
	const resClass = resInfo.class , distance = resInfo.distance 
	const users = resInfo.users , quantity = Math.max(users.length , resInfo.quantity) 
	const date = resInfo.date 
	let [storedResInfo , setStoredResInfo] = useState(null)

	console.log({profile})
	

	useEffect(() => {
		setStoredResInfo(resInfo)
		localStorage.setItem('storedResInfo' , JSON.stringify(storedResInfo))
	},[storedResInfo])
	//fetching the stored information about reservation
	useEffect(() => {
		let result = JSON.parse(localStorage.getItem('storedResInfo'))
		console.log('Reservation information',result)  
	})

	const processReservation = async (e) => {
		e.preventDefault() 

		if(!profile){
			alert('Please login to continue reservation.Thanks')
			localStorage.setItem('storedResInfo' , JSON.stringify(storedResInfo))
			navigate('/login')
		}

		localStorage.removeItem('storedResInfo') 
		const response = await fetch("http://localhost:4000/user/confirmReservation" , {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				resInfo , user:profile , username:profile.username , name:profile.name
			})
		} )

		const result = await response.json() 
		// if(result) //remove reservation information stored in local storage
		console.log(result)
		window.alert(result.msg)  
		if(result.success ) { // in case of successful ticket booking updating user information and redirecting user to print ticket option
			setProfile(result.user)  
			navigate("/reservations") 
		}

	}

	//for adding this journey to user's wishlist
	const addToWishlist = (e) => {
		e.preventDefault() 
		console.log("This adding to wishlist of the user.....")
	}

	const generatePdf = () => {
		const report = new JsPdf('portrait','pt','a2') 
		report.html(document.getElementById('printableSection')).then(() => {
			report.save('ticket.pdf') 
		})
	}

	if(location.state.resInfo) return (<> 


		<div id="printableSection">
		 <div>
			<div className="shadow-xl rounded-lg brightness-125 font-bold text-xl text-cyan-600 flex justify-center p-4">
				<span className="mt-12">Your Journey Details</span>
			</div>
				<div className="p-4 bg-auto backdrop-brightness-100 brightness-100 contrast-105 shadow-2xl md:p-16 p-8">
					<div className="flex justify-center text-sky-600 brightness-125 gap-8 mb-6">
						<span className="flex justify-center m-2 font-semibold">Train Details</span>
						<div className="flex justify-center gap-8 m-2 text-indigo-600">
							<span>{train.number}</span>
						<span className="">{train.name}</span>
						</div>
					</div>

					<div className="flex justify-center text-sky-600 brightness-125 gap-8">
							<div className="flex ">
								<span className="font-semibold">Boarding Details</span>
							</div>
							<div className="px-2 text-indigo-600">
								<span className="flex justify-center">{stations.boarding.stationName}</span>
								<div className="flex gap-2 p-2 justify-center">
									<span className="px-2">{stations.boarding.arrivalTime}</span>
									<div className="border-b-2 border-cyan-700 h-[0px] mt-2.5 w-[50px]"></div>
									<span className="px-2">{stations.boarding.departureTime}</span>
								</div>
							</div>
					</div>

					<div className="text-sky-500 brightness-125 gap-8 flex justify-center">
							<div>
								<span className="font-semibold">Destination Details</span>
							</div>
							<div className="px-2 text-indigo-600">
								<span className="flex justify-center">{stations.destination.stationName}</span>
								<div className="flex gap-2 p-2 justify-center">
									<span className="px-2">{stations.destination.arrivalTime}</span>
									<div className="border-b-2 border-cyan-700 h-[0px] mt-2.5 w-[50px]"></div>
									<span className="px-2">{stations.destination.departureTime}</span>
								</div>
							</div>
					</div>

					<div className="text-sky-500 brightness-125 gap-8 flex justify-center">
						<span className="font-semibold">Ticket Details</span>
						<div className="px-16 flex flex-col text-indigo-600">
							<span>{resClass.classType}</span>
							<span>No. of Tickets: {quantity}</span>
							<span>Payable Amount: {quantity * distance * (resClass.fareRatio?resClass.fareRatio:resClass.fairRatio)} </span>
						</div>
					</div>

					<div className="flex gap-8 justify-center p-3 mt-3">
						<span className="flex font-semibold text-cyan-600 justify-start brightness-125 px-2">Journey Date</span>
						<span className="flex px-12 text-indigo-700 brightness-125 flex text-center"
							>{`${date.day.value} ${date.month.name} ${date.year}, ${stations.boarding.arrivalTime}`}</span>
					</div>
				</div>
			</div>

			<div className="flex justify-center ">
					
					<div className="w-[700px] md:w-[860px] lg:w-[1020px] xl:w-[1160px] rounded-lg shadow-2xl px-12 py-8">
						<table className="">
							<thead className="brightness-200 contrast-100 text-cyan-900 font-semibold text-md shadow-2xl">
							<tr>
								<th className="md:px-6 px-2 py-6 text-center">Person No.</th>
								<th className="md:px-6 px-2 py-6 text-center">Name</th>
								<th className="md:px-6 px-2 py-6 text-center">Phone</th>
								<th className="md:px-6 px-2 py-6 text-center">E-mail</th>
								<th className="md:px-6 px-2 py-6 text-center">Age</th>
								<th className="md:px-6 px-2 py-6 text-center">Address</th>
							</tr>
							</thead>

							<tbody className="brightness-150 contrast-150 text-indigo-800 text-md backdrop-brightness-100">
								{ users.map((user ,index) => 
								<tr className="hover:font-semibold hover:text-cyan-900 hover:shadow-2xl hover:brightness-125 hover:contrast-125 hover:backdrop-blur-xl">
									<td className="md:px-6 px-2 py-6 text-center">
										Person {(index+1)}
									</td>
									<td className="md:px-6 px-2 py-6 text-center">
										{user.name}
									</td>
									<td className="md:px-6 px-2 py-6 text-center">
										{user.phone}
									</td>
									<td className="md:px-6 px-2 py-6 text-center">
										{user.email}
									</td>
									<td className="md:px-6 px-2 py-6 text-center">
										{user.age}
									</td>
									<td className="md:px-6 px-2 py-6 text-center">
										{user.address}
									</td>
								</tr>
								)}
							</tbody>
						</table>
						
					</div>

				</div>
			</div>

				<div className="p-8 flex gap-8 flex justify-center text-center shadow-xl backdrop-brightness-105 mt-8">
					<button onClick={(e) => processReservation(e)}
						className="rounded-lg shadow-2xl border-2 px-4 py-2 hover:border-transparent hover:border-cyan-900 hover:brightness-150 text-cyan-500 text-lg hover:bg-blue-600 hover:text-black hover:font-semibold hover:shadow-2xl border-cyan-700">
						Confirm & Pay</button>
					<NavLink to = "/" 
						className="rounded-lg shadow-2xl border-2 px-4 py-2 hover:border-transparent hover:border-cyan-900 hover:brightness-150 text-cyan-500 text-lg hover:bg-blue-600 hover:text-black hover:font-semibold hover:shadow-2xl border-cyan-700">
						Leave it</NavLink>
					<button onClick={() => generatePdf() }
						className="rounded-lg shadow-2xl border-2 px-4 py-2 hover:border-transparent hover:border-cyan-900 hover:brightness-150 text-cyan-500 text-lg hover:bg-blue-600 hover:text-black hover:font-semibold hover:shadow-2xl border-cyan-700">
						
						print</button>
				</div>

		</>)

	else return (<> 
		<div className="flex flex-col items-center shadow-2xl font-semibold text-red-500 text-lg p-16 md:p-24 backdrop-brightness-200">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200 shadow-2xl hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}


export default ReservationConfirmation