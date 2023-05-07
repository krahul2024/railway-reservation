import React from 'react'
import { NavLink } from 'react-router-dom'


const Login = () => {
	return (
		<>
		<div className="flex items-center justify-center">

			<div className="md:mt-64 mt-32 md:p-8 p-4 shadow-sm rounded-lg bg-auto">

				<div className="text-center md:mb-40 mb-32">
					<h1 className="text-center text-cyan-900 text-3xl font-bold">Welcome Back!</h1>
					<span className=" text-cyan-800 italic ">login to experience world of blogs....</span>
				</div>
				
				<div className=" text-center md:mt-24 mt-12">
					<button className="text-5xl rounded-full bg-auto p-2">
					<ion-icon name="person-outline"></ion-icon>
					</button>
					
					<form action="">
						<input className="w-2/3 mx-2 border-b shadow-md border-gray-100 rounded-lg border-b p-3 mb-2 outline-0" type="text" placeholder="username" name="username"/>
						<input className="w-2/3 p-3 mx-2 border-b border-gray-100 shadow-md mb-2 rounded-lg outline-0" type="password" placeholder="password" name="password"/>
						<button className="italic text-cyan-900">
							not registerd yet?   <NavLink to={"/register"} className="text-red-500 font-light not-italic"> register..</NavLink>
						</button>
					</form>
				</div>

			</div>
		
		</div>
		</>
		)
}


export default Login;