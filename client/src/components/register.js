import React , { useState } from 'react' 
import { NavLink , useLocation , useNavigate } from 'react-router-dom'
import baseUrl from './baseUrl.js'


const Register = () => {

	let [user , setUser] = useState({
		name:"",username:"",password:""
	})

	const setInputs = (e) => {
		const name = e.target.name , value = e.target.value 
		setUser({...user , [name]:value})
	}

	const handleInputs = async(e) => {
		e.preventDefault() 
		console.log(user) 

		if(user.name.length === 0) alert('Please provide a real name.')
		if(user.username.length === 0) alert('Username should be of length greater than 0')
		if(user.password.length<=4) alert('Password length should be more than 4 characters.')

		else {
			try{

				const response = await fetch(`${baseUrl}/user/register` , {
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({
						name:user.name ,
						username:user.username ,
						password:user.password 
					})
				})

				const result = await response.json() 
				window.alert(result.msg)
				console.log(result) 
			}
			catch(error) {
				console.log(error) 
				if(error.message)window.alert(error.message) 
				else window.alert("There was an error registering you! Please try again later.")
			}
		}
		
	}

	let [showPass , setShowPass] = useState("password")
	const showPassword = (e) => {
		e.preventDefault() 
		if(showPass === "password") setShowPass("text")
		else if(showPass === "text") setShowPass("password")
	}

	return (<>

		<div>
			<form action="" className="flex justify-center mt-28 md:mt-44 mb-40">
				
				<div className="p-16 shadow-sm w-[600px] md:w-[800px] rounded-xl backdrop-blur-3xl">
					<div className="flex flex-col p-8 items-center rounded-lg ">
						<span className="p-1 font-extrabold text-3xl text-cyan-600">Sign Up</span>
						<span className="italic text-sky-500">register to experience hassle-free ticket booking</span>
					</div>

					<div className="mt-12 flex flex-col items-center rounded-xl p-8">
						<span className="flex px-3 py-3 text-4xl bg-transparent rounded-2xl shadow-lg bg-sky-900 mb-16">
							<ion-icon name="person-outline"></ion-icon>
						</span>

						<div className="p-4">

							<div className="flex flex-col p-3 mb-1">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Name</span>
								<div className="flex mt-2">
										<span className="-mr-5 mb-1">
											<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 text-sky-500">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
											</svg>
										</span>		
										<input type="text" value={user.name} name="name" onChange = { setInputs}
											className="w-[450px] outline-0 bg-transparent px-8 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
										/>
									</div>
							</div>

							<div className="flex flex-col p-3 mb-1">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Username</span>
								<div className="flex mt-2">
									<span className="-mr-5 mb-1">
										<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 text-sky-500">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
										</svg>	
									</span>
									<input type="text" value={user.username} name="username" onChange = { setInputs}
										className="w-[450px] outline-0 bg-transparent px-8 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
									</div>
							</div>

							<div className="flex flex-col p-3">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Password</span>
								<div className="flex">
									<div className="flex mt-2">
										<span className="-mr-5 mb-1">
											<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 text-sky-500">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
											</svg>
										</span>		
										<input type={showPass} value={user.password} name="password" onChange = { setInputs}
										className="w-[450px] outline-0 bg-transparent px-8 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
										/>
									</div>
									
									<button className="cursor-pointer text-cyan-500 -ml-10"
										onClick = {showPassword } >
										{ showPass === "password" && (
										<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-7 h-7">
										  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
										  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg> 
										)}
										{ showPass === "text" && (
											<svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-7 h-7">
											  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
											</svg>
										)}
									</button>
								</div>
							</div>

							<div className="flex flex-col justify-center items-center mt-8">
							  <button onClick={(e) => handleInputs(e)}
							    className="w-full flex justify-center cursor-pointer px-28 py-1.5 border border-sky-700 hover:border-transparent hover:bg-blue-600 hover:text-gray-900 font-semibold text-slate-400 rounded-full w-fit"
							  >
							    Go
							  </button>
							  <span className="flex gap-2 items-center justify-center py-3 px-1 text-sky-500">
							    Already registered? 
							    <NavLink to="/login"
							      className="text-emerald-600 hover:font-semibold brightness-125"
							    >
							      Login
							    </NavLink>
							  </span>
							</div>					
						</div>
					</div>	
				</div>
			</form>
		</div>


	 </>)
}

export default Register 