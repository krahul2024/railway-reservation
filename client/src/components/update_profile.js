import React , { useState } from 'react' 
import { NavLink , useLocation , useNavigate } from 'react-router-dom'


const UpdateProfile = () => {

	const navigate = useNavigate() 
	const location = useLocation() 

	console.log(location.state)
	const user = location.state.user 

	let [username , setUsername] = useState(user.username)
	let [password , setPassword] = useState('password')
	let [name , setName] = useState(user.name)
	let [address , setAddress] = useState(user.address)
	let [phone , setPhone] = useState(user.phone)
	let [email ,setEmail] = useState(user.email)

	const processProfileUpdateData = async(e) => {
		e.preventDefault() 
		console.log('Name:',name,'\nUsername:',username, "\nPassword:",password)

		try{
			const response = await fetch("http://localhost:4000/user/update_user" , {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				username , name , phone , address , email 
				})
			})

			const data = await response.json() 

			if(!data.success) throw new Error(data.msg)

			window.alert(data.msg) 
			navigate("/user/profile")
		}
		catch(error) {
			console.log(error.message) 
			if(error.message)window.alert(error.message)  
			else window.alert("There was an error logging you in! Please try again later. Thanks.")
		}
		

	}

	return (<>

		<div>
			<form action="" className="flex justify-center mt-28 md:mt-44 mb-40">
				
				<div className="p-16 shadow-2xl backdrop-brightness-125 w-[600px] md:w-[800px] rounded-xl backdrop-blur-3xl">
					<div className="flex flex-col p-8 items-center rounded-lg ">
						<span className="p-1 font-extrabold text-3xl text-cyan-600">Update Profile</span>
						<span className="italic text-sky-500 text-center">please provide all the information(s) asked for hassle-free ticket booking</span>
					</div>

					<div className="mt-12 flex flex-col items-center shadow-2xl backdrop-brightness-125 rounded-xl p-8">
						<span className="flex px-3 py-3 text-4xl bg-transparent rounded-2xl shadow-2xl bg-sky-900 mb-16">
							<ion-icon name="person-outline"></ion-icon>
						</span>

						<div className="p-4">

							<div className="flex flex-col p-2 mb-1">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Name</span>
								<input type="text" value={name} onChange = { (e) => setName(e.target.value)}
									className="outline-0 bg-transparent p-2 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
							</div>

							<div className="flex flex-col p-2">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Username</span>
								<input type="text" value={username}
									className="outline-0 bg-transparent px-2 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
							</div>

							<div className="flex flex-col p-2 mb-1">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Phone</span>
								<input type="text" value={phone} onChange = { (e) => setPhone(e.target.value)}
									className="outline-0 bg-transparent p-2 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
							</div>

							<div className="flex flex-col p-2">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">E-mail</span>
								<input type="text" value={email} onChange = { (e) => setEmail(e.target.value)}
									className="outline-0 bg-transparent px-2 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
							</div>

							<div className="flex flex-col p-2">
								<span className="text-cyan-500 font-semibold px-1 py-1 -ml-2">Address</span>
								<input type="text" value={address} onChange = { (e) => setAddress(e.target.value)}
									className="outline-0 bg-transparent px-2 border-b-2 border-cyan-700 text-indigo-500 hover:border-indigo-600 hover:brightness-150 shadow-2xl"
									/>
							</div>

						</div>

						<div className="flex flex-col items-center space-y-3 mt-4">
							<button onClick = { (e) => processProfileUpdateData(e)}
								className="flex items-center cursor-pointer px-28 py-1.5 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 font-semibold text-sky-700 rounded-full w-fit"
								>Update</button>
							<NavLink to="/profile"
								className="flex items-center cursor-pointer px-28 py-1.5 border border-sky-900 hover:border-transparent hover:bg-blue-800 hover:text-gray-900 font-semibold text-sky-700 rounded-full w-fit"
								>cancel</NavLink>
						</div>
					</div>
				</div>	


			</form>
		</div>


	 </>)
}

export default UpdateProfile