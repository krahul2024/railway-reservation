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
	const [passes , setPasses] = useState(users)
	let [storedResInfo , setStoredResInfo] = useState(null)
	const [otp , setOtp] = useState(null)
	const [confirm , setConfirm] = useState(false)
	const [sent , setSent] = useState(false)
	const [edit , setEdit] = useState(false) 
	const [idx, setIdx] = useState(-1)
	const [name , setName] = useState('')
	const [email ,setEmail] = useState('')
	const [age , setAge] = useState('') 
	const [address , setAddress] = useState('')
	const [phone , setPhone] = useState('')

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

	const sendOtp = async(e) => {
		e.preventDefault() 
		// if the user is not logged in then prompting user to login first in order to book
		// the tickets 

		if(!profile){
			alert('Please login to continue reservation.Thanks')
			localStorage.setItem('storedResInfo' , JSON.stringify(storedResInfo))
			navigate('/login')
		}
		//sending otp for user authentication 
		try{
			const response = await fetch("http://localhost:4000/train/send_otp",{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					user:profile
				})
			})
			const result = await response.json() 
			if(result.success) setSent(true) 
			alert(result.msg) 
		}
		catch(error) {
			console.log(error) 
			alert('There was an error! Please try again later.')
		}
	}

	const verifyOtp = async(e) => {
		e.preventDefault() 
		console.log(otp)
		// this will be shown in last after successful otp verification 
		try{
			const response = await fetch("http://localhost:4000/train/verify_otp",{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					otp
				})
			})  

			const result = await response.json() 
			alert(result.msg) 
			if(result.success){
			 setSent(false) 
			 setConfirm(true) 
			 alert(result.msg) 
			}
		}
		catch(error) {
			console.log(error) 
			alert('There was an error! Please try again later.')
		}
	}
			
	const processReservation = async (e) => {
		e.preventDefault()
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
			localStorage.removeItem('storedResInfo') 
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

	const deleteUser = (e , index) => {
		e.preventDefault() 
		console.log(users[index])

	}

	const handleChange = (e , index) => {
		e.preventDefault() 
		const name = e.target.name , value = e.target.value 
		// console.log(name , value)
		let values = [...passes]
		values[index][name] = value  
		setPasses(values)
	}

	const updateSelectedUser = (e , index) => {
		e.preventDefault() 


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

				<div className="flex flex-col justify-center items-center mx-12">
					<span className="px-4 py-1 mt-8 flex justify-items-center text-sky-500 text-lg font-semibold">List of all the passengers</span>
					<div className="text-blue-600 mt-6 flex justify-items-center">
						<table className="">
							<tr className="gap-8">
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">Action</th>
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">Name</th>
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">E-mail</th>
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">Phone</th>
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">Address</th>
								<th className="text-center border-sky-800 px-2 py-1.5 rounded-md">Age</th>
							</tr>
							<tbody className="px-4">
							{ passes.length>0 && passes.map((user , index) => (
								<tr index className="hover:brightness-125 hover:backdrop-brightness-125 text-cyan-500 mx-auto">
									
									<td className="px-4 py-2 text-center border-sky-800 px-2 py-1.5">
										{(!edit || idx!== index) && (
											<div>
												<button onClick = {(e) => {
													setEdit(true) 
													setIdx(index)
													updateSelectedUser(e,index)
												}}
													className="bg-transparent p-2 rounded-lg my-1">edit</button>
												<button onClick = {(e) => deleteUser(e)}
													className="bg-transparent p-2 rounded-lg my-1">delete</button>
											</div>
										)}
										{edit && idx === index && (
											<div>
												<button onClick = {(e) => {
													updateSelectedUser(e , index) 
													setEdit(false) 
													setIdx(-1)
												}}
													className="bg-transparent p-2 rounded-lg my-1">save</button>
												<button onClick = {(e) => {
													setEdit(false) 
													setIdx(-1)
												}}
													className="bg-transparent p-2 rounded-lg my-1">cancel</button>
											</div>
										)}
									</td>

									<td className="text-center border-sky-800 px-2 py-1.5 rounded-md">
										{(!edit || idx!==index) && user.name}
										{edit && idx===index && (
											<input type="text" name="name" value = {user.name} onChange = {(e) => handleChange(e , index)}
												className="w-[180px] border-b-2 bg-transparent border-sky-600 hover:border-indigo-600 outline-0 px-3"/>
								
										)}
									</td>
									<td className="text-center border-sky-800 px-2 py-1.5 rounded-md">
										{(!edit || idx!==index) && user.phone}
										{edit && idx===index && (
											<input type="text" name="phone" value = {user.phone} onChange = {(e) => handleChange(e ,index)}
												className="w-[130px] border-b-2 bg-transparent border-sky-600 hover:border-indigo-600 outline-0 px-3"/>
											
										)}
									</td>
									<td className="text-center border-sky-800 px-2 py-1.5 rounded-md">
										{(!edit || idx!==index) && user.email}
										{edit && idx===index && (
											<input type="text" name="email" value = {user.email} onChange = {(e) => handleChange(e , index)}
												className="w-[260px] border-b-2 bg-transparent border-sky-600 hover:border-indigo-600 outline-0 px-3"/>
											
										)}
									</td>
									<td className="text-center border-sky-800 px-2 py-1.5 rounded-md">
										{(!edit || idx!==index) && user.address}
										{edit && idx===index && (
											<input type="text" name="address" value = {user.address} onChange = {(e) => handleChange(e ,index)} 
												className="w-[380px] border-b-2 bg-transparent border-sky-600 hover:border-indigo-600 outline-0 px-3"/>
											
										)}
									</td>
									<td className="text-center border-sky-800 px-2 py-1.5 rounded-md">
										{(!edit || idx!==index) && user.age}
										{edit && idx===index && (
											<input type="text" name="age" value = {user.age} onChange = {(e) => handleChange(e , index)} 
												className="w-[50px] border-b-2 bg-transparent border-sky-600 hover:border-indigo-600 outline-0 px-3"/>
											
										)}
									</td>
								</tr>
								) )}

							</tbody>
						</table>
					</div>
					
				</div>
			</div>
				<div className="p-8 flex gap-3 flex justify-center text-center shadow-xl backdrop-brightness-105 mt-8">
					{confirm && (
						<div className="flex gap-3">
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
					)}
					

					{
						!confirm && (
							<div className="md:flex gap-2">
								{ sent && (
									<div className="flex gap-2">
										<input name = "otp" onChange  onChange = {(e) => setOtp(e.target.value)}
											className="p-2.5 bg-transparent border-sky-600 border-2 rounded-lg px-8 hover:border-indigo-600 outline-0 text-indigo-600"
											type="text"/>
										<button onClick={(e) => verifyOtp(e) }
											className="rounded-lg shadow-2xl border-2 px-4 py-2 hover:border-transparent hover:border-cyan-900 hover:brightness-150 text-cyan-500 text-lg hover:bg-blue-600 hover:text-black hover:font-semibold hover:shadow-2xl border-cyan-700">
											Verify OTP</button>
									</div>
								)}
								<button onClick={(e) => sendOtp(e) }
									className="mt-2 md:mt-0 rounded-lg shadow-2xl border-2 px-4 py-1 hover:border-transparent hover:border-cyan-900 hover:brightness-150 text-cyan-500 text-lg hover:bg-blue-600 hover:text-black hover:font-semibold hover:shadow-2xl border-cyan-700">
									{`${sent?'Re':''}`}send confirmation OTP</button>
							</div>
							

							)
					}
					
				</div>

		</>)

	else return (<> 
		<div className="flex flex-col items-center shadow-2xl font-semibold text-red-500 text-lg p-16 md:p-24 backdrop-brightness-200">
		Seems all empty in here.<NavLink className="px-8 hover:text-bold backdrop-brightness-200 shadow-2xl hover:brightness-150 " to="/">Go To Homepage</NavLink>
		</div>
		
		</>)
}


export default ReservationConfirmation