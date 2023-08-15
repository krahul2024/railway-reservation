import React , { useState ,useEffect , useContext} from 'react'  
import { NavLink , useNavigate , useLocation } from 'react-router-dom'
import {UserContext } from '../userContext.js'
import JsPdf from 'jspdf'
import baseUrl from './baseUrl.js'

const ReservationConfirmation = () => {

	const location = useLocation() 
	const navigate = useNavigate() 
	const {profile , setProfile} = useContext(UserContext) 
	const resInfo = location.state.resInfo
	const train = resInfo.train, stations = resInfo.stations 
	const resClass = resInfo.class , distance = resInfo.distance 
	let users = resInfo.users , quantity = Math.max(users.length , resInfo.quantity) 
	const date = resInfo.date 
	const [storedResInfo , setStoredResInfo] = useState(null)
	const [otp , setOtp] = useState(null)
	const [confirm , setConfirm] = useState(false)
	const [sent , setSent] = useState(false)
	const [edit ,setEdit] = useState(false) 
	const [idx , setIdx] = useState(-1)
	const [info , setInfo] = useState({
		name:'',email:'',address:'',phone:'',age:''
	})

	const [passes , setPasses] = useState(resInfo.users) 
	
	useEffect(() => {
		setStoredResInfo(resInfo)
		localStorage.setItem('storedResInfo' , JSON.stringify(storedResInfo))
	},[storedResInfo])
	//fetching the stored information about reservation
	useEffect(() => {
		let result = JSON.parse(localStorage.getItem('storedResInfo'))
		// console.log('Reservation information',result)  
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
			const response = await fetch(`${baseUrl}/train/send_otp`,{
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
		// console.log(otp)
		// this will be shown in last after successful otp verification 
		try{
			const response = await fetch(`${baseUrl}/train/verify_otp`,{
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
		console.log(resInfo.users) 
		const response = await fetch(`${baseUrl}/user/confirmReservation` , {
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
		// console.log(result)
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

	const handleInfoChange = (e) => {
		e.preventDefault()
		const name = e.target.name , value = e.target.value 
		// console.log(name, value)
		setInfo({...info , [name]:value})
	}

	const deleteSelectedUser = (e , index) => {
		e.preventDefault() 
		setPasses(prev=> prev.filter((item , id) => index!==id)) 
		resInfo.users = [...passes]
	}

	if(location.state.resInfo) return (<> 
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
		<div className="flex flex-col items-center px-4 py-6 gap-y-4">
			<span className="text-cyan-500 font-semibold text-lg p-4">List of all the passengers</span>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 flex items-center">
				{passes.length>0 && passes.map((user , index) => (
					<div className="flex items-center justify-center">
					{ (!edit || idx!==index) && (
						<div className="flex text-start  flex-col border-cyan-900 border rounded-lg px-6 py-3 gap-y-4 bg-transparent text-blue-500 brightness-125">
							<span className="mb-2">Person {index+1}</span>
							<span className="mt-6 bg-transparent px-4 py-1.5 ">{user.name}</span>
							<span className="bg-transparent px-4 py-1.5">{user.email}</span>
							<span className="bg-transparent px-4 py-1.5">{user.phone}</span>
							<span className="bg-transparent px-4 py-1.5">{user.address}</span>
							<span className="bg-transparent px-4 py-1.5">{user.age} Years</span>
							<div className="flex justify-center gap-4">
								<button onClick = {(e) => {
									setEdit(true)
									setIdx(index)
									!edit && setInfo(user) 
								}}
									className="flex gap-2 items-center border-cyan-900 border px-4 py-1 rounded-lg text-sky-500 hover:bg-blue-800 hover:text-black hover:brightness-150"
									>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
									</svg>
										Edit</button>
								<button onClick = {(e) => {
									window.confirm('Are you sure to delete this user?') && deleteSelectedUser(e , index)  
								}}
									className="flex gap-2 items-center border-cyan-900 border px-4 py-1 rounded-lg text-sky-500 hover:bg-blue-800 hover:text-black hover:brightness-150"
									>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor" className="w-6 h-5">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
									</svg>
										Delete</button>
							</div>
						</div>
					)}

					{ edit && idx===index && (
						<div className="flex flex-col border-cyan-900 border rounded-lg px-6 py-3 gap-y-4 bg-transparent text-blue-500 brightness-125">
							<span className="mb-2">Person {index+1}</span>
							<input type="text" value={info.name} name="name" onChange = {(e) => handleInfoChange(e)}
							 className="mt-2 outline-0 bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 py-1.5 w-[300px]"/>
							<input type="text" value={info.email} name="email" onChange = {(e) => handleInfoChange(e)}
							 className="outline-0 bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 py-1.5 w-[300px]"/>
							<input type="text"  value={info.phone} name="phone" onChange = {(e) => handleInfoChange(e)}
							 className="outline-0 bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 py-1.5 w-[170px]"/>
							<textarea type="text"  value={info.address} name="address" onChange = {(e) => handleInfoChange(e)}
							 className="outline-0 flex justify-start bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 py-1.5 w-auto"/>
							<input type="text"  value={info.age} name="age" onChange = {(e) => handleInfoChange(e)}
							 className="outline-0 bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 py-1.5 w-[70px]"/>
							<div className="flex justify-center gap-4 mt-3 mb-1">
								<button onClick = {(e) => {
									setEdit(false)
									setIdx(-1)
									let values = [...passes]  
									values[index] = info
									setPasses(values) 
								}}
									className="flex gap-2 items-center border-cyan-900 border px-4 py-1 rounded-lg text-sky-500 hover:bg-blue-800 hover:text-black hover:brightness-150"
									>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
									</svg>
									Save</button>
								<button onClick = {(e) => {
									setEdit(false)
									setIdx(-1)
								}}
									className="flex gap-2 items-center border-cyan-900 border px-4 py-1 rounded-lg text-sky-500 hover:bg-blue-800 hover:text-black hover:brightness-150"
									>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
									  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
									Cancel</button>
							</div>
						</div>
					)}
					
					</div>

				))}
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
											type="text" 
											 className="outline-0 bg-transparent border-b border-sky-600 hover:border-indigo-600 px-4 w-full py-1"/>
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