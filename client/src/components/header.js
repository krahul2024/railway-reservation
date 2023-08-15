import React , { useState , useEffect , useContext } from 'react' 
import { NavLink , useLocation , useNavigate } from 'react-router-dom' 
import { UserContext } from '../userContext.js'
import baseUrl from './baseUrl.js'

const Header = () => {
	const {profile , setProfile} = useContext(UserContext)
	const navigate = useNavigate()
	const location = useLocation()

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

	const showPnrStatus = async(e) => {

	}
	return (<> 

		<div>
			<div className="py-2 min-h-max shadow-2xl shadow-gray-800 items-center">
				<div className="flex gap-2 md:gap-8 justify-between px-2 md:px-8 xl:px-24 2xl:px-36 3xl:px-52">
					<NavLink to={"/"}
						className="flex gap-2 px-2 md:gap-4 items-center">
						<span className="text-cyan-500">
							<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M4 15.5V6q0-1.325.688-2.113t1.812-1.2q1.125-.412 2.563-.55T12 2q1.65 0 3.113.138t2.55.55q1.087.412 1.712 1.2T20 6v9.5q0 1.475-1.012 2.488T16.5 19l1.5 1.5v.5h-2l-2-2h-4l-2 2H6v-.5L7.5 19q-1.475 0-2.488-1.012T4 15.5ZM6 10h5V7H6v3Zm7 0h5V7h-5v3Zm-4.5 6q.65 0 1.075-.425T10 14.5q0-.65-.425-1.075T8.5 13q-.65 0-1.075.425T7 14.5q0 .65.425 1.075T8.5 16Zm7 0q.65 0 1.075-.425T17 14.5q0-.65-.425-1.075T15.5 13q-.65 0-1.075.425T14 14.5q0 .65.425 1.075T15.5 16Z"/></svg>
						</span>
						<span className="text-sky-500 font-semibold text-lg">e-rail</span>
					</NavLink>

					<div className="flex gap-3 md:gap-4 lg:gap-8 py-1">
						{profile && profile.isAdmin && (
						<div className="mt-1">
							<NavLink to="/info"
								className="text-sky-600 font-semibold text-md hover:text-sky-400 cursor-pointer">Management</NavLink>
						</div>
						)}

						<div className="mt-1">
							<NavLink to="/pnr-status"
								className="text-sky-600 font-semibold text-md hover:text-sky-400 cursor-pointer">PNR-Status</NavLink>
						</div>

						<span className="text-sky-500 font-semibold text-md flex md:gap-2">
							{profile && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-1">
							  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
							</svg> 
							)}
							<NavLink to={profile?"/user/profile":"/login"} className="mt-1 text-sky-600 font-semibold text-md hover:text-sky-400 cursor-pointer">{profile?profile.name.split(" ")[0]+"...":"login"}</NavLink>
						</span>

						{profile === null && (
						<div className="mt-1">
							<NavLink to = {"/register"}
								className="text-sky-600 font-semibold text-md hover:text-sky-400 cursor-pointer">
								register</NavLink>
						</div>
						)}

						{profile && (
						<div className="mt-1">
							<span onClick = {(e) => processLogout(e) }
								className="text-sky-600 font-semibold text-md hover:text-sky-400 cursor-pointer">logout</span>
						</div>
						)}

					</div>
					
				</div>

			</div>
		</div>


		</>)
}


export default Header 
