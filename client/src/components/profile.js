import React , { useState , useEffect , useContext } from 'react' 
import { NavLink , useLocation , useNavigate , useParams} from 'react-router-dom'
import profileImage from '../images/profile.jpg'
import {UserContext }from '../userContext.js'
import Tickets from './ticket.js'
import baseUrl from './baseUrl.js'

const Profile = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const { subpage } = useParams() 

	const {profile , setProfile } = useContext(UserContext)

	if(profile) console.log(profile.reservations)

	let [storedResInfo , setStoredResInfo] = useState(null) 

	useEffect(() => {
		const result = JSON.parse(localStorage.getItem('storedResInfo')) 
		// console.log({result})
		setStoredResInfo(result) 
	},[])
	// console.log({storedResInfo})
	let basic_information = []

	if(profile) basic_information = [{
			title:"Username" , value:profile.username
		},{
			title:"Name"  , value:profile.name,
		},{
			title:"Date Joined" , value:profile.joinedAt
		},
		{
			title:"E-mail" , value:profile.email
		},{
			title:"Phone" , value:profile.phone
		},{
			title:"Address" , value:profile.address
		}
		]

	function presentClass(url) {
		let classes = 'inline-flex text-center items-center border border-sky-800 bg-transparent gap-3 px-6 py-2 text-cyan-600 font-semibold rounded-full'
		if(url === subpage) return `inline-flex text-center items-center gap-3 px-6 py-2 font-semibold text-gray-950 bg-blue-900 rounded-full backdrop-brightness-200 brightness-150` 
		return classes
	} 

	const processLogout = async(e) => {
		e.preventDefault() 
		console.log(profile)  
		localStorage.removeItem('storedResInfo') //removing stored reservation item in case if user is logging out

		try{
			const response = await fetch(`${baseUrl}/user/logout`,{
				method:"POST",
				credentials:"include",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					username:profile.username , name:profile.name
				})
			})

			const result = await response.json() 
			console.log(result) 
			if(!result.success) throw new Error(result.msg) 
			else if(result.success){
				setProfile(null) 
				window.location.reload() //refreshing the page which will redirect automatically to homepage
			}

		}
		catch(error) {
			console.log(error) 
			// error.message?window.alert(error.message):window.alert("There was an error loggin you in! Please try again later.")
		}
	}


	return (<> 

	{ profile && ( 
		<div>
		<nav className="flex w-full justify-center p-12 gap-4"> 
			<NavLink to = {`/user/profile`}  
				className={presentClass('profile')}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>
				My Profile
				 </NavLink >

			<NavLink to={'/user/favourites'}
				className={presentClass('favourites')}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
				</svg>
				My Favourites
				</NavLink>

			<NavLink to={`/user/reservations`}
				className={presentClass('reservations')}> 
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
				</svg>
				My Reservations
				</NavLink>
		</nav>

		{subpage === 'profile' && (
		<div className="md:flex justify-center">
			<div>
				<form action="" className="flex justify-center mt-6 mb-20">
					<div className="flex p-2 shadow-2xl backdrop-brightness-125 rounded-xl backdrop-blur-3xl">
							<div className="flex flex-col items-center shadow-2xl backdrop-brightness-125 rounded-xl p-8">
								<div className="p-2">
									<div className="md:flex md:gap-4 m-2 bg-slate-900 rounded-3xl p-2 min-h-max">
										<div className="flex flex-col items-center shadow-lg p-4 rounded-lg justify-center">
											<img src={profileImage} className="w-36 h-36 md:w-48 lg:h-48 rounded-full " 
											alt=""/>
											<button onClick = { (e) => processLogout(e) }
												 className="flex text-sky-600 hover:text-slate-950 items-center gap-3 mt-6 backdrop-brightness-150 px-6 py-1 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-full w-auto"
												 	>
												 	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
													  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
													</svg>
													logout</button>
										</div>

										<div className="justify-between p-12">
											<table>
											{ basic_information.map((item)=>(
												
												<div className="flex items-center px-8 gap-8 py-2">
													<td className="text-md font-semibold text-sky-500">{item.title}: </td>
													<td className="text-md text-indigo-400">{item.value}</td>
												</div>

											))}
											</table>
										</div>
									</div>
								</div>

								<div className="flex gap-3 md:gap-6">
									<div className="flex">
										<button onClick={() => {
											navigate("/update_profile",{
												state:{
													user:profile
												}
											})
										}}
											className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6  py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-full w-auto"
											>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
											</svg>Edit profile</button>
									</div>
									<div className="flex">
										<button onClick={() => {
											navigate("/",{
												state:{
													user:profile
												}
											})
										}}
											className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6 py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-full w-auto"
											><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-6 h-6">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
											</svg>Get Tickets</button>
									</div>


									{
										storedResInfo ?  (
											<div className="flex">
											<button onClick={() => {
												navigate("/confirmation",{
													state:{
														resInfo:storedResInfo
													}
												})
											}}
												className="flex text-sky-600 hover:text-slate-950 items-center gap-3 backdrop-brightness-150 px-6 py-2 border border-sky-700 hover:border-transparent hover:bg-indigo-800 text-b-400 hover:font-semibold rounded-full w-auto"
												><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-7 h-6">
												  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
												</svg>Continue previous booking</button>
											</div>
											) : <div></div>
									}
								</div>
							</div>
							
						</div>
				</form>
			</div>

		</div>
		)} 

		</div>
			
		)}
		{ subpage === 'reservations' && (

			<div>
				{
					profile && profile.reservations.length === 0 && (
						<div>Nothing to show here</div>
						)
				}
				{
					profile && profile.reservations.map((item) => (

						<Tickets tickets = {item} />

						))
				}
			</div>
			)}

			{
				subpage === 'favourites' && (
					<div className="flex justify-center">
						<span className="p-4 text-sky-500 font-semibold">Nothing to show here</span>
					</div>

					)
			}

		{!profile && (
			<div>Login to see profile information</div>
		) }

		</> )
}


export default Profile